using Domain.Items;
using Domain.Repositories;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infra.Data
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(IConfiguration configuration, IMongoClient mongoClient) : base(configuration, mongoClient) { }

        public async Task<List<Item>> GetByUser(Guid userId) =>
           await _mongoCollection.Find(x => x.UserId == userId).ToListAsync();

        public async Task<Item?> GetAndValidateOwner(Guid itemId, Guid userId) =>
        
            await _mongoCollection.Find(x => x.UserId == userId && x.Id == itemId).FirstOrDefaultAsync();
        

    }
}