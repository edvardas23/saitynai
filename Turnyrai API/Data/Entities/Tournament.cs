using System.ComponentModel.DataAnnotations;
using Turnyrai_API.Auth.Model;

namespace Turnyrai_API.Data.Entities
{
    public class Tournament : IUserOwnedResource
    { 
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Prize { get; set; }
        public List<Team> Teams { get; set; }

        [Required]
        public string UserId { get; set; }
        public TournamentsRestUser User { get; set; }
    }
}
