using Core.Domain.Entities;

namespace Domain.Items
{
    public class Item : Entity<Item>
    {
        private Item(Guid userId, string description)
        {
            Id = Guid.NewGuid();
            UserId = userId;
            Description = description;
            IsPurchased = false;
            CreatedAt = DateTime.Now;
            PurchasedAt = null;
        }

        private Item() { }

        public Guid UserId { get; private set; }
        public string Description { get; private set; } = null!;
        public bool IsPurchased { get; set; }
        public DateTime? PurchasedAt { get; set; }

        public static class Factory
        {
            public static Item Create(Guid userId, string description) =>
                new(userId, description);

            public static Item CreateNewItem(Guid id, Guid userId, string description, bool isPurchased, DateTime createdAt, DateTime? purchasedAt)
                => new()
                {
                    Id = id,
                    UserId = userId,
                    Description = description,
                    IsPurchased = isPurchased,
                    CreatedAt = createdAt,
                    PurchasedAt = purchasedAt,
                };
        }
    }
}