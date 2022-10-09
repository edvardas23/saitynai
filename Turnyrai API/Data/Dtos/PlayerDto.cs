using System.ComponentModel.DataAnnotations;

namespace Turnyrai_API.Data.Dtos
{
    public record PlayerDto(int Id, string Name, string Sports, int Age);

    public record CreatePlayerDto(string Name, string Sports, [Range(0, 120)] int Age);

    public record UpdatePlayerDto(string Name, string Sports, [Range(0, 120)] int Age);
}