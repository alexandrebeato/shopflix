using Newtonsoft.Json;

namespace API.Models.Items
{
    public class ItemModel
    {
        [JsonProperty("id")]
        public Guid Id { get; private set; }

        [JsonProperty("userId")]
        public Guid UserId { get; set; }

        [JsonProperty("description")]
        public string? Description { get; set; }

        [JsonProperty("quantity")]
        public double Quantity { get; set; }

        [JsonProperty("isPurchased")]
        public bool IsPurchased { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("purchasedAt")]
        public DateTime PurchasedAt { get; set; }

        [JsonProperty("image")]
        public string? Image { get; set; }
    }
}