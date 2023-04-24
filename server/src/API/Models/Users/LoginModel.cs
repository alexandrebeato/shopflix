using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace API.Models.Users
{
    public class LoginModel
    {
        [JsonProperty("email")]
        [Required(ErrorMessage="Email is required")]
        public string? Email { get; set; }

        [JsonProperty("password")]
        [Required(ErrorMessage="Password is required")]
        public string? Password { get; set; }
    }
}