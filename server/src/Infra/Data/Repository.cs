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
            _mongoCollection = _mongoClient.GetDatabase(_configuration["mongoConnection:database"]).GetCollection<T>(typeof(T).Name.ToLower());
        }
        
        public Task Insert(T entity) =>
            _mongoCollection.InsertOneAsync(entity);

        public Task Update(T entity) =>
            _mongoCollection.ReplaceOneAsync(x => x.Id == entity.Id, entity);

        public Task Delete(Guid id) =>
            _mongoCollection.DeleteOneAsync(x => x.Id == id);

        public Task<List<T>> GetAll() =>
            _mongoCollection.Find(x => true).ToListAsync();

        public Task<T> GetById(Guid id) =>
            _mongoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
}