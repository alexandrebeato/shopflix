using Newtonsoft.Json;

namespace API.Models.Users
{
    public class RegisterUserModel
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

}