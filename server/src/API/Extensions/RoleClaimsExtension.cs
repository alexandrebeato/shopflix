using System.Security.Claims;
using API.Models.Users;

namespace API.Extensions;

public static class RoleClaimsExtension
{
    public static IEnumerable<Claim> GetClaims(this UserModel user)
    {
        var result = new List<Claim>
        {
            new(ClaimTypes.Name, user.Id ?? string.Empty),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new(ClaimTypes.GivenName, user.Name ?? string.Empty)
        };
        return result;
    }
}