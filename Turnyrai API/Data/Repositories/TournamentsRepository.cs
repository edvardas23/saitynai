using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Turnyrai_API.Data.Entities;

namespace Turnyrai_API.Data.Repositories
{
    public interface ITournamentsRepository
    {
        Task<IEnumerable<Tournament>> GetAllAsync();
        Task<Tournament> GetAsync(int id);
        Task CreateAsync(Tournament tournament);
        Task PutAsync(Tournament tournament);
        Task DeleteAsync(Tournament tournament);

    }
    public class TournamentsRepository : ITournamentsRepository
    {
        private readonly TournamentsDbContext _db;
        public TournamentsRepository(TournamentsDbContext tournamentsDbContext)
        {
            _db = tournamentsDbContext;
        }
        public async Task<IEnumerable<Tournament>> GetAllAsync()
        {
            return await _db.Tournaments.ToListAsync();
        }
        public async Task<Tournament?> GetAsync(int id)
        {
            return await _db.Tournaments.FirstOrDefaultAsync(o => o.Id == id);
        }
        public async Task CreateAsync(Tournament tournament)
        {
            _db.Tournaments.Add(tournament);
            await _db.SaveChangesAsync();
        }
        public async Task PutAsync(Tournament tournament)
        {
            _db.Tournaments.Update(tournament);
            await _db.SaveChangesAsync();
        }
        public async Task DeleteAsync(Tournament tournament)
        {
            _db.Tournaments.Remove(tournament);
            await _db.SaveChangesAsync();
        }
    }
}
