using System.Security.Claims;

namespace Core.Domain.Interfaces
{
    public interface IUser
    {
        Guid GetAuthenticatedUserId();
        string GetAuthenticatedUserName();
        bool IsAuthenticated();
        IEnumerable<Claim> GetPermissions();
    }
}