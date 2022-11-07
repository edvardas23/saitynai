using System.ComponentModel.DataAnnotations;

namespace Turnyrai_API.Data.Dtos
{
    public record RegisterUserDto([Required] string UserName, [EmailAddress][Required] string Email, [Required] string Password);
    public record UserDto(string Id, string UserName, string Email);
    public record LoginDto(string UserName, string Password);
    public record SuccessfulLoginDto(string AccessToken);
    public record SuccessfulLogOutDto(string AccessToken);
}
