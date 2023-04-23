using System.ComponentModel.DataAnnotations;
using API.Models.Users;
using Newtonsoft.Json;

namespace API.Models.Items
{
    public class CreateItemModel
    {
        public CreateItemModel()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }

        public Guid Id { get; }
        public DateTime CreatedAt { get; }

        [JsonProperty("description")]
        [Required(ErrorMessage = "Description is required")]
        public string? Description { get; set; }

        [JsonProperty("quantity")]
        [Required(ErrorMessage = "Quantity is required")]
        public double? Quantity { get; set; }

        [JsonProperty("image")]
        public string? Image { get; set; }

    }
}