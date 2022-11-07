//using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Turnyrai_API.Auth
{
    public interface IJwtTokenService
    {
        string CreateAccessTokenAsync(string userName, string userId, IEnumerable<string> userRoles);
        string DestroyAccessToken();
        string ReturnGuid();
        //public static string guid { get; set; };
    }
    public class JwtTokenService : IJwtTokenService
    {
        private readonly SymmetricSecurityKey _authSigningKey;
        public static string guid { get; set; }
        public JwtTokenService(IConfiguration configuration)
        {
            _authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
          
        }
        public string ReturnGuid()
        {
            return guid;
        }
        public string CreateAccessTokenAsync(string userName, string userId, IEnumerable<string> userRoles)
        {
            guid = Guid.NewGuid().ToString();
            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Name, userName),
                new(JwtRegisteredClaimNames.Jti, guid),
                new(JwtRegisteredClaimNames.Sub, userId),
            };

            authClaims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));

            var _accessSecurityToken = new JwtSecurityToken
            (         
                expires: DateTime.UtcNow.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(_authSigningKey, SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(_accessSecurityToken);
        }
        public string DestroyAccessToken()
        {
            var authClaims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, "Deleted"),
            };
            var _accessSecurityToken = new JwtSecurityToken
            (
                expires: DateTime.UtcNow.AddHours(-1),
                signingCredentials: new SigningCredentials(_authSigningKey, SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(_accessSecurityToken);
        }
    }
}
