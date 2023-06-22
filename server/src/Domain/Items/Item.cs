using Core.Domain.Entities;

namespace Domain.Items
{
    public class Item : Entity<Item>
    {
        private Item(Guid id, Guid userId, string description, decimal quantity, bool isPurchased, DateTime purchasedAt, string image)
        {
            Id = id;
            UserId = userId;
            Description = description;
            Quantity = quantity;
            IsPurchased = isPurchased;
            PurchasedAt = purchasedAt;
            Image = image;
        }

        private Item() { }

        public Guid UserId { get; private set; }
        public string Description { get; private set; } = null!;
        public decimal Quantity { get; private set; }
        public bool IsPurchased { get; private set; }
        public DateTime? PurchasedAt { get; private set; }
        public string Image { get; private set; } = null!;

        public static class Factory
        {
            public static Item Create(Guid id, Guid userId, string description, decimal quantity, bool isPurchased,
                DateTime purchasedAt, string image) =>
                new(id, userId, description, quantity, isPurchased, purchasedAt, image);

            public static Item CreateNewItem(Guid id, Guid userId, string description, decimal quantity, string image)
                => new()
                {
                    Id = id,
                    UserId = userId,
                    Description = description,
                    Quantity = quantity,
                    IsPurchased = false,
                    Image = image
                };
        }
    }
}