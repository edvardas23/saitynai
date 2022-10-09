using Microsoft.AspNetCore.Mvc;
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

        public TournamentsController(ITournamentsRepository tournamentsRepository)
        {
            _tournamentsRepository = tournamentsRepository;
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
        public async Task<ActionResult<TournamentDto>> Post(CreateTournamentDto dto)
        {
            var tournament = new Tournament { Name = dto.Name, Description = dto.Description, Prize = dto.Prize };

            await _tournamentsRepository.CreateAsync(tournament);
            //201
            return Created("", new TournamentDto(tournament.Id, tournament.Name, tournament.Description, tournament.Prize));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<TournamentDto>> Put(int id, UpdateTournamentDto dto)
        {
            var tournament = await _tournamentsRepository.GetAsync(id);
            if (tournament == null) return NotFound($"Turnyras su id:'{id}' neegzistuoja");

            tournament.Name = dto.Name;
            tournament.Description = dto.Description;
            tournament.Prize = dto.Prize;

            await _tournamentsRepository.PutAsync(tournament);

            return Ok(new TournamentDto(tournament.Id, tournament.Name, tournament.Description, tournament.Prize));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<TournamentDto>> Delete(int id)
        {
            var tournament = await _tournamentsRepository.GetAsync(id);
            if (tournament == null) return NotFound($"Turnyras su id:'{id}' neegzistuoja");

            await _tournamentsRepository.DeleteAsync(tournament);
            //200-204
            return NoContent();
        }
    }
}
