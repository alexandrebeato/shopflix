using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace API.Models.Users
{
    public class RegisterUserModel
    {
        public RegisterUserModel()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }

        [JsonProperty("id")]
        public Guid Id { get; }

        [JsonProperty("name")]
        [Required(ErrorMessage="Name is required")]
        public string? Name { get; set; }

        [JsonProperty("email")]
        [Required(ErrorMessage="Email is required")]
        public string? Email { get; set; }

        [JsonProperty("password")]
        [Required(ErrorMessage="Password is required")]
        public string? Password { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; }

    }

}