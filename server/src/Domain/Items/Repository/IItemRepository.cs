using Core.Domain.Interfaces;

namespace Domain.Items.Repository
{
    public interface IItemRepository : IRepository<Item>
    {
        public Task<List<Item>> GetByUser(Guid userId);
    }
}