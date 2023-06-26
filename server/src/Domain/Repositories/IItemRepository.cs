using Core.Domain.Interfaces;
using Domain.Items;

namespace Domain.Repositories
{
    public interface IItemRepository : IRepository<Item>
    {
        public Task<List<Item>> GetByUser(Guid userId);
        public Task<Item> GetAndValidateOwner(Guid itemId, Guid userId);
    }
}