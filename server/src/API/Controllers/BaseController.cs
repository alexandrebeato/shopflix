using Core.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class BaseController : Controller
    {
        protected Guid? UserId { get; set; }
        protected string? UserName { get; set; }

        protected BaseController(IUser user)
        {
            if (!user.IsAuthenticated()) return;
            UserId = user.GetAuthenticatedUserId();
            UserName = user.GetAuthenticatedUserName();
        }
    }
}