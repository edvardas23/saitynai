using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Turnyrai_API.Auth;
using Turnyrai_API.Auth.Model;
using Turnyrai_API.Data.Dtos;

namespace Turnyrai_API.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly UserManager<TournamentsRestUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        public AuthController(UserManager<TournamentsRestUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var user = await _userManager.FindByNameAsync(registerUserDto.UserName);
            if (user != null)
                return BadRequest("Naudotojas jau egzistuoja!");

            var newUser = new TournamentsRestUser
            {
                Email = registerUserDto.Email,
                UserName = registerUserDto.UserName
            };
            var createUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (!createUserResult.Succeeded)
                return BadRequest("Naudotojo sukūrimas nesėkmingas!");

            await _userManager.AddToRoleAsync(newUser, TournamentRoles.Guest);

            return CreatedAtAction(nameof(Register), new UserDto(newUser.Id.ToString(), newUser.UserName, newUser.Email));
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
                return BadRequest("Naudotojo vardas neegzistuoja!");
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
                return BadRequest("Blogas slaptažodis!");
            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessTokenAsync(user.UserName, user.Id, roles);
            var jti = _jwtTokenService.ReturnGuid();
            await _userManager.SetAuthenticationTokenAsync(user, "JWT", "JWT Token", jti);

            return Ok(new SuccessfulLoginDto(accessToken));
        }
        [HttpPost]
        [Authorize]
        [Route("logout")]
        public async Task<IActionResult> LogOut()
        {  
            TournamentsRestUser tournamentsRestUser = await _userManager.FindByIdAsync(User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var jti = await _userManager.GetAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");
            if (jti != User.FindFirstValue(JwtRegisteredClaimNames.Jti))
                return Unauthorized();

            //await _userManager.(tournamentsRestUser);
            await _userManager.RemoveAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");

            return Ok();
        }
    }
}
