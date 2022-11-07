namespace Turnyrai_API.Auth.Model
{
    public class TournamentRoles
    {
        public const string Admin = nameof(Admin);
        public const string TeamOwner = nameof(TeamOwner);
        public const string Guest = nameof(Guest);
        public static readonly IReadOnlyCollection<string> All = new[] { Admin, TeamOwner, Guest };
    }
}
