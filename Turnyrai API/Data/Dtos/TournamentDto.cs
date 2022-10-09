using System.ComponentModel.DataAnnotations;

namespace Turnyrai_API.Data.Dtos.Tournaments
{
    public record TournamentDto(int Id, string Name, string Description, float Prize);

    public record CreateTournamentDto([Required] string Name, [Required] string Description, [Range(0, 9999999)] float Prize);

    public record UpdateTournamentDto([Required] string Name, [Required] string Description, [Range(0, 9999999)] float Prize);
}
