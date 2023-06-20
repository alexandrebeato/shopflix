using System.Security.Claims;
using API.Models.Users;
using Domain.Users;

namespace API.Extensions;

public static class RoleClaimsExtension
{
    public static IEnumerable<Claim> GetClaims(this UserModel user)
    {
        var result = new List<Claim>
        {
            new(ClaimTypes.Name, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.GivenName, user.Name)
        };
        return result;
    }
}