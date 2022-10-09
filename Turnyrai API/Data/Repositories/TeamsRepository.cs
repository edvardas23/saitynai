using Microsoft.EntityFrameworkCore;
using Turnyrai_API.Data.Entities;

namespace Turnyrai_API.Data.Repositories
{
    public interface ITeamsRepository
    {
        Task<List<Team>> GetAllAsync(int tournamentId);
        Task<Team> GetAsync(int tournamentId, int teamId);
        Task CreateAsync(Team team);
        Task UpdateAsync(Team team);
        Task RemoveAsync(Team team);
    }
    public class TeamsRepository : ITeamsRepository
    {
        private readonly TournamentsDbContext _db;
        public TeamsRepository(TournamentsDbContext tournamentsDbContext)
        {
            _db = tournamentsDbContext;
        }
        public async Task<List<Team>> GetAllAsync(int tournamentId)
        {
            return await _db.Teams.Where(o => o.TournamentId == tournamentId).ToListAsync();
        }
        public async Task<Team> GetAsync(int tournamentId, int teamId)
        {
            return await _db.Teams.FirstOrDefaultAsync(o => o.TournamentId == tournamentId && o.Id == teamId);
        }
        public async Task CreateAsync(Team team)
        {
            _db.Teams.Add(team);
            await _db.SaveChangesAsync();
        }
        public async Task UpdateAsync(Team team)
        {
            _db.Teams.Update(team);
            await _db.SaveChangesAsync();
        }
        public async Task RemoveAsync(Team team)
        {
            _db.Teams.Remove(team);
            await _db.SaveChangesAsync();
        }
    }
}
