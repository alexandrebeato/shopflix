using System.Security.Claims;
using Core.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infra.Data;

public class AspNetUser : IUser
{
    private readonly IHttpContextAccessor _accessor;

    public AspNetUser(IHttpContextAccessor accessor)
    {
        _accessor = accessor;
    }
    
    public Guid GetAuthenticatedUserId()
    {
        return Guid.Parse(_accessor.HttpContext.User.Identity.Name);
    }

    public string GetAuthenticatedUserName()
    {
        return _accessor.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName).Value;
    }

    public bool IsAuthenticated()
    {
        return _accessor.HttpContext.User.Identity.IsAuthenticated;
    }

    public IEnumerable<Claim> GetPermissions()
    {
        return  _accessor.HttpContext.User.Claims;
    }
}