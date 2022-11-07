using System.ComponentModel.DataAnnotations;
using Turnyrai_API.Auth.Model;

namespace Turnyrai_API.Data.Entities
{
    public class Player : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sports { get; set; }
        public int Age { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }

        [Required]
        public string UserId { get; set; }
        public TournamentsRestUser User {get; set; }
    }
}
