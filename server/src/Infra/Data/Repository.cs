using Core.Domain.Entities;
using Core.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Infra.Data
{
    public class Repository<T> : IRepository<T> where T : Entity<T>
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoClient _mongoClient;
        protected readonly IMongoCollection<T> _mongoCollection;

        public Repository(IConfiguration configuration, IMongoClient mongoClient)
        {
            var pack = new ConventionPack { new CamelCaseElementNameConvention() };
            ConventionRegistry.Register("elementNameConvention", pack, x => true);
            _configuration = configuration;
            _mongoClient = mongoClient;
            _mongoCollection = _mongoClient.GetDatabase(_configuration["ShopFlix"]).GetCollection<T>(typeof(T).Name.ToLower());
        }

        public Task Insert(T entity) =>
            _mongoCollection.InsertOneAsync(entity);

        public Task Update(T entity) =>
            _mongoCollection.ReplaceOneAsync(x => x.Id == entity.Id, entity);

        public Task Delete(Guid id) =>
            _mongoCollection.DeleteManyAsync(x => x.Id == id);

        public Task DeleteItems(List<T> items)
        {
            // Assuming T has an 'Id' property as the unique identifier, adjust this according to your actual data structure.
            var ids = items.Select(item => item.Id).ToList();

            // Construct a filter based on the '_id' field
            var filter = Builders<T>.Filter.In("_id", ids);

            // Use the filter in the DeleteManyAsync method
            return _mongoCollection.DeleteManyAsync(filter);
        }

        public Task<List<T>> GetAll() =>
            _mongoCollection.Find(x => true).ToListAsync();

        public Task<T> GetById(Guid id) =>
            _mongoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
}