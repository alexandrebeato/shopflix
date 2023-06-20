using Newtonsoft.Json;

namespace API.Models.Users
{
    public class RegisterUserModel
    {
        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("email")]
        public string? Email { get; set; }

        [JsonProperty("password")]
        public string? Password { get; set; }
    }

}