using Microsoft.AspNetCore.Identity;

namespace Turnyrai_API.Auth.Model
{
    public class TournamentsRestUser : IdentityUser
    {
        [PersonalData]
        public string? AdditionalInfo { get; set; }
    }
}
