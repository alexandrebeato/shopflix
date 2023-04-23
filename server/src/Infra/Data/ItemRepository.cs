using Domain.Items;
using Domain.Items.Repository;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infra.Data
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(IConfiguration configuration, IMongoClient mongoClient) : base(configuration, mongoClient) { }

        public Task<List<Item>> GetByUser(Guid userId) =>
            _mongoCollection.Find(x => x.UserId == userId).ToListAsync();
    }
}