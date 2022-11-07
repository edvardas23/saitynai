using System.ComponentModel.DataAnnotations;
using Turnyrai_API.Auth.Model;

namespace Turnyrai_API.Data.Entities
{
    public class Team : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Leader { get; set; }
        public int TournamentId { get; set; }
        public Tournament Tournament { get; set; }
        public List<Player> Players { get; set; } 
        public string UserId { get; set; }
        public TournamentsRestUser User { get; set; }
    }
}
