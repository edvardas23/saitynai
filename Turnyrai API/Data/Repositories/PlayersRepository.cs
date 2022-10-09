using Microsoft.EntityFrameworkCore;
using Turnyrai_API.Data.Entities;

namespace Turnyrai_API.Data.Repositories
{
    public interface IPlayersRepository
    {
        Task<List<Player>> GetAllAsync(int teamId);
        Task<Player> GetAsync(int teamId, int playerId);
        Task CreateAsync(Player player);
        Task UpdateAsync(Player player);
        Task RemoveAsync(Player player);
    }
    public class PlayersRepository : IPlayersRepository
    {
        private readonly TournamentsDbContext _db;
        public PlayersRepository(TournamentsDbContext tournamentsDbContext)
        {
            _db = tournamentsDbContext;
        }
        public async Task<List<Player>> GetAllAsync(int teamId)
        {
            return await _db.Players.Where(o => o.TeamId == teamId).ToListAsync();
        }
        public async Task<Player> GetAsync(int teamId, int playerId)
        {
            return await _db.Players.FirstOrDefaultAsync(o => o.TeamId == teamId && o.Id == playerId);
        }
        public async Task CreateAsync(Player player)
        {
            _db.Players.Add(player);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Player player)
        {
            _db.Players.Update(player);
            await _db.SaveChangesAsync();
        }

        public async Task RemoveAsync(Player player)
        {
            _db.Players.Remove(player);
            await _db.SaveChangesAsync();
        }
    }
}
