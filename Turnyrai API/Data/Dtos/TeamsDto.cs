using System.ComponentModel.DataAnnotations;

namespace Turnyrai_API.Data.Dtos
{
    public record TeamDto(int Id, string Name, string Description, string Leader);
    public record GetTeamDto(int Id, string Name, string Description, string Leader, string userId);

    public record TeamDtoGetAll(int Id, string Name, string Description, string Leader, string userId);

    public record CreateTeamDto([Required] string Name, [Required] string Description, [Required] string Leader);

    public record UpdateTeamDto([Required]string Name, [Required] string Description, [Required] string Leader);
}
