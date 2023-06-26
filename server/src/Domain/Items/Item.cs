using Core.Domain.Entities;

namespace Domain.Items
{
    public class Item : Entity<Item>
    {
        private Item(Guid userId, string description, double quantity, string? image)
        {
            Id = Guid.NewGuid();
            UserId = userId;
            Description = description;
            Quantity = quantity;
            IsPurchased = false;
            CreatedAt = DateTime.Now;
            PurchasedAt = null;
            Image = image;
        }

        private Item() { }

        public Guid UserId { get; private set; }
        public string Description { get; private set; } = null!;
        public double Quantity { get; private set; }
        public bool IsPurchased { get; set; }
        public DateTime? PurchasedAt { get; set; }
        public string? Image { get; private set; }

        public static class Factory
        {
            public static Item Create(Guid userId, string description, double quantity, string? image) =>
                new(userId, description, quantity, image);

            public static Item CreateNewItem(Guid id, Guid userId, string description, double quantity, bool isPurchased,DateTime createdAt, DateTime? purchasedAt, string? image)
                => new()
                {
                    Id = id,
                    UserId = userId,
                    Description = description,
                    Quantity = quantity,
                    IsPurchased = isPurchased,
                    CreatedAt = createdAt,
                    PurchasedAt = purchasedAt,
                    Image = image
                };
        }
    }
}