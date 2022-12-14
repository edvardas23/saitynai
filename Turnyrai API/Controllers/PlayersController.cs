using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Turnyrai_API.Auth.Model;
using Turnyrai_API.Data.Dtos;
using Turnyrai_API.Data.Entities;
using Turnyrai_API.Data.Repositories;

namespace Turnyrai_API.Controllers
{
    [ApiController]
    [Route("api/tournaments/{tournamentId}/teams/{teamId}/players")]
    public class PlayersController : ControllerBase
    {
        private readonly ITeamsRepository _teamsRepository;
        private readonly ITournamentsRepository _tournamentsRepository;
        private readonly IPlayersRepository _playersRepository;
        private readonly IAuthorizationService _authorizationService;
        private readonly UserManager<TournamentsRestUser> _userManager;
        public PlayersController(UserManager<TournamentsRestUser> userManager, IPlayersRepository playersRepository, ITeamsRepository teamsRepository, ITournamentsRepository tournamentsRepository, IAuthorizationService authorizationService)
        {
            _teamsRepository = teamsRepository;
            _tournamentsRepository = tournamentsRepository;
            _playersRepository = playersRepository;
            _authorizationService = authorizationService;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<ActionResult<List<PlayerDtoGetAll>>> GetAllAsync(int tournamentId, int teamId)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var players = await _playersRepository.GetAllAsync(teamId);
            return Ok(players.Select(o => new PlayerDtoGetAll(o.Id, o.Name, o.Sports, o.Age, o.UserId)));
        }
        [HttpGet("{playerId}")]
        public async Task<ActionResult<PlayerDto>> GetAsync(int tournamentId, int teamId, int playerId)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var player = await _playersRepository.GetAsync(teamId, playerId);
            if (player == null) return NotFound($"Žaidėjas su id:'{playerId}' neegzistuoja");

            return new PlayerDto(player.Id, player.Name, player.Sports, player.Age);
        }

        [HttpPost]
        [Authorize(Roles = TournamentRoles.TeamOwner)]
        public async Task<ActionResult<PlayerDto>> PostAsync(int tournamentId, int teamId, CreatePlayerDto dto)
        {
            TournamentsRestUser tournamentsRestUser = await _userManager.FindByIdAsync(User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var jti = await _userManager.GetAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");
            if (jti != User.FindFirstValue(JwtRegisteredClaimNames.Jti))
                return Unauthorized();

            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var player = new Player
            {
                Name = dto.Name,
                Sports = dto.Sports,
                Age = dto.Age,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };
            player.TeamId = teamId; //-------------------------?
            await _playersRepository.CreateAsync(player);
            //201
            return Created("Sukurta!", new PlayerDto(player.Id, player.Name, player.Sports, player.Age));
        }

        [HttpPut("{playerId}")]
        [Authorize(Roles = TournamentRoles.TeamOwner)]
        public async Task<ActionResult<PlayerDto>> Put(int tournamentId, int teamId, int playerId, UpdatePlayerDto dto)
        {
            TournamentsRestUser tournamentsRestUser = await _userManager.FindByIdAsync(User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var jti = await _userManager.GetAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");
            if (jti != User.FindFirstValue(JwtRegisteredClaimNames.Jti))
                return Unauthorized();

            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var player = await _playersRepository.GetAsync(teamId, playerId);
            if (player == null) return NotFound($"Žaidėjas su id:'{playerId}' neegzistuoja");

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, player, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }
            player.Name = dto.Name;

            if(!string.IsNullOrWhiteSpace(dto.Sports))
                player.Sports = dto.Sports;

            if(dto.Age != null && dto.Age > 0)
                player.Age = dto.Age;

            await _playersRepository.UpdateAsync(player);

            return Ok(new PlayerDto(player.Id, player.Name, player.Sports, player.Age));
        }

        [HttpDelete("{playerId}")]
        [Authorize(Roles = TournamentRoles.TeamOwner)]
        public async Task<ActionResult> Delete(int tournamentId, int teamId, int playerId)
        {
            TournamentsRestUser tournamentsRestUser = await _userManager.FindByIdAsync(User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var jti = await _userManager.GetAuthenticationTokenAsync(tournamentsRestUser, "JWT", "JWT Token");
            if (jti != User.FindFirstValue(JwtRegisteredClaimNames.Jti))
                return Unauthorized();

            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var player = await _playersRepository.GetAsync(teamId, playerId);
            if (player == null) return NotFound($"Žaidėjas su id:'{playerId}' neegzistuoja");

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, player, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            await _playersRepository.RemoveAsync(player);
            //200-204
            return NoContent();
        }
    }
}
