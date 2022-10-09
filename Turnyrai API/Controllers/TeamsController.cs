using Microsoft.AspNetCore.Mvc;
using Turnyrai_API.Data.Dtos;
using Turnyrai_API.Data.Dtos.Tournaments;
using Turnyrai_API.Data.Entities;
using Turnyrai_API.Data.Repositories;

namespace Turnyrai_API.Controllers
{
    [ApiController]
    [Route("api/tournaments/{tournamentId}/teams")]

    public class TeamsController : Controller
    {
        private readonly ITeamsRepository _teamsRepository;
        private readonly ITournamentsRepository _tournamentsRepository;


        public TeamsController(ITeamsRepository teamsRepository, ITournamentsRepository tournamentsRepository)
        {
            _teamsRepository = teamsRepository;
            _tournamentsRepository = tournamentsRepository;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<TeamDto>>> GetAllAsync(int tournamentId)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var teams = await _teamsRepository.GetAllAsync(tournamentId);
            return Ok(teams.Select(o => new TeamDto(o.Id, o.Name, o.Description, o.Leader)));
        }
        [HttpGet("{teamId}")]
        public async Task<ActionResult<TeamDto>> GetAsync(int tournamentId, int teamId)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            return new TeamDto(team.Id, team.Name, team.Description, team.Leader);
        }
       
        [HttpPost]
        public async Task<ActionResult<TournamentDto>> PostAsync(int tournamentId, CreateTeamDto dto)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = new Team { Name = dto.Name, Description = dto.Description, Leader = dto.Leader };
            team.TournamentId = tournamentId; //-------------------------?
            await _teamsRepository.CreateAsync(team);
            //201
            return Created("Sukurta!", new TeamDto(team.Id, team.Name, team.Description, team.Leader));
        }
        
        [HttpPut("{teamId}")]
        public async Task<ActionResult<TeamDto>> Put(int tournamentId, int teamId, UpdateTeamDto dto)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");
            
            team.Name = dto.Name;
            //team.Description = dto.Description;
            team.Leader = dto.Leader;
           
            await _teamsRepository.UpdateAsync(team);

            return Ok(new TeamDto(team.Id, team.Name, team.Description, team.Leader));
        }
        
        [HttpDelete("{teamId}")]
        public async Task<ActionResult> Delete(int tournamentId, int teamId)
        {
            var tournament = await _tournamentsRepository.GetAsync(tournamentId);
            if (tournament == null) return NotFound($"Turnyras su id:'{tournamentId}' neegzistuoja");

            var team = await _teamsRepository.GetAsync(tournamentId, teamId);
            if (team == null) return NotFound($"Komanda su id:'{teamId}' neegzistuoja");

            await _teamsRepository.RemoveAsync(team);
            //200-204
            return NoContent();
        }
    }
}
