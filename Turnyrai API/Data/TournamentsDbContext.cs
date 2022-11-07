using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Turnyrai_API.Auth.Model;
using Turnyrai_API.Data.Entities;

namespace Turnyrai_API.Data
{
    public class TournamentsDbContext : IdentityDbContext<TournamentsRestUser>
    {
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:turnyraiapidbserver.database.windows.net,1433;Initial Catalog=Turnyrai API_db;Persist Security Info=False;User ID=edvardas1;Password=Rusne23!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
 