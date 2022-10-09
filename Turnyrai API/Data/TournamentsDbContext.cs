using Microsoft.EntityFrameworkCore;
using Turnyrai_API.Data.Entities;

namespace Turnyrai_API.Data
{
    public class TournamentsDbContext : DbContext
    {
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=TournamentsDb");
        }
    }
}
 