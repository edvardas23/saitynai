using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Turnyrai_API.Auth.Model;
using Turnyrai_API.Data.Dtos.Tournaments;
using Turnyrai_API.Data.Entities;
using Turnyrai_API.Data.Repositories;

namespace Turnyrai_API.Controllers
{
    [ApiController]
    [Route("api/tournaments")]
    public class TournamentsController : Controller
    {
        private readonly ITournamentsRepository _tournamentsRepository;
        private readonly UserManager<TournamentsRestUser> _userManager;
        public TournamentsController(UserManager<TournamentsRestUser> userManager, ITournamentsRepository tournamentsRepository)
        {
            _tournamentsRepository = tournamentsRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task <IEnumerable<TournamentDto>> GetAll()
        {
            return (await _tournamentsRepository.GetAllAsync()).Select(o => new TournamentDto(o.Id, o.Name, o.Description, o.Prize));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TournamentDto>> Get(int id)
        {
            var tournament = await _tournamentsRepository.GetAsync(id);

            if (tournament == null) return NotFound($"Turnyras su id:'{id}' neegzistuoja");

            return new TournamentDto(tournament.Id, tournament.Name, tournament.Description, tournament.Prize);
        }

        [HttpPost]
        [Authorize(Roles = TournamentRoles.Admin)]
        public async Task<ActionResult<TournamentDto>> Post(CreateTournamentDto dto)
        {
            TournamentsRestUser tournamentsRestUser = await _userManager.FindByIdAsync(User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var jti = await _userManager.GetAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");
            if (jti != User.FindFirstValue(JwtRegisteredClaimNames.Jti))
                return Unauthorized();

            var tournament = new Tournament 
            { 
                Name = dto.Name, 
                Description = dto.Description, 
                Prize = dto.Prize,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _tournamentsRepository.CreateAsync(tournament);
            //201
            return Created("", new TournamentDto(tournament.Id, tournament.Name, tournament.Description, tournament.Prize));
        }
        [HttpPut("{id}")]
        [Authorize(Roles = TournamentRoles.Admin)]
        public async Task<ActionResult<TournamentDto>> Put(int id, UpdateTournamentDto dto)
        {
            TournamentsRestUser tournamentsRestUser = await _userManager.FindByIdAsync(User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var jti = await _userManager.GetAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");
            if (jti != User.FindFirstValue(JwtRegisteredClaimNames.Jti))
                return Unauthorized();

            var tournament = await _tournamentsRepository.GetAsync(id);
            if (tournament == null) return NotFound($"Turnyras su id:'{id}' neegzistuoja");

            tournament.Name = dto.Name;
            tournament.Description = dto.Description;
            tournament.Prize = dto.Prize;

            await _tournamentsRepository.PutAsync(tournament);

            return Ok(new TournamentDto(tournament.Id, tournament.Name, tournament.Description, tournament.Prize));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = TournamentRoles.Admin)]
        public async Task<ActionResult<TournamentDto>> Delete(int id)
        {
            TournamentsRestUser tournamentsRestUser = await _userManager.FindByIdAsync(User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var jti = await _userManager.GetAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");
            if (jti != User.FindFirstValue(JwtRegisteredClaimNames.Jti))
                return Unauthorized();

            var tournament = await _tournamentsRepository.GetAsync(id);
            if (tournament == null) return NotFound($"Turnyras su id:'{id}' neegzistuoja");

            await _tournamentsRepository.DeleteAsync(tournament);
            //200-204
            return NoContent();
        }
    }
}
