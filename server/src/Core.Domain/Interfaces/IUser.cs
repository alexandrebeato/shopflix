using System.Security.Claims;

namespace Core.Domain.Interfaces
{
    public interface IUser
    {
        string Identity { get; }
        Guid GetAuthenticatedUserId();
        string GetAuthenticatedUserName();
        bool IsAuthenticated();
        IEnumerable<Claim> GetPermissions();
    }
}