using Microsoft.AspNetCore.Mvc;
using Turnyrai_API.Data.Dtos;
using Turnyrai_API.Data.Entities;
using Turnyrai_API.Data.Repositories;

namespace Turnyrai_API.Controllers
{
    [ApiController]
    [Route("api/tournaments/{tournamentId}/teams/{teamId}/players")]
    public class PlayersController : Controller
    {
        private readonly ITeamsRepository _teamsRepository;
        private readonly ITournamentsRepository _tournamentsRepository;
        private readonly IPlayersRepository _playersRepository;
        public PlayersController(IPlayersRepository playersRepository, ITeamsRepository teamsRepository, ITournamentsRepository tournamentsRepository)
        {
            _teamsRepository = teamsRepository;
            _tournamentsRepository = tournamentsRepository;
            _playersRepository = playersRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<PlayerDto>>> GetAllAsync(int tournamentId, int teamId)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var players = await _playersRepository.GetAllAsync(teamId);
            return Ok(players.Select(o => new PlayerDto(o.Id, o.Name, o.Sports, o.Age)));
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
        public async Task<ActionResult<PlayerDto>> PostAsync(int tournamentId, int teamId, CreatePlayerDto dto)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var player = new Player { Name = dto.Name, Sports = dto.Sports, Age = dto.Age };
            player.TeamId = teamId; //-------------------------?
            await _playersRepository.CreateAsync(player);
            //201
            return Created("Sukurta!", new PlayerDto(player.Id, player.Name, player.Sports, player.Age));
        }

        [HttpPut("{playerId}")]
        public async Task<ActionResult<PlayerDto>> Put(int tournamentId, int teamId, int playerId, UpdatePlayerDto dto)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var player = await _playersRepository.GetAsync(teamId, playerId);
            if (player == null) return NotFound($"Žaidėjas su id:'{playerId}' neegzistuoja");

            player.Name = dto.Name;
            player.Sports = dto.Sports;
            player.Age = dto.Age;

            await _playersRepository.UpdateAsync(player);

            return Ok(new PlayerDto(player.Id, player.Name, player.Sports, player.Age));
        }

        [HttpDelete("{playerId}")]
        public async Task<ActionResult> Delete(int tournamentId, int teamId, int playerId)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            var player = await _playersRepository.GetAsync(teamId, playerId);
            if (player == null) return NotFound($"Žaidėjas su id:'{playerId}' neegzistuoja");

            await _playersRepository.RemoveAsync(player);
            //200-204
            return NoContent();
        }
    }
}
