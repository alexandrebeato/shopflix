using Domain.Repositories;
using Domain.Users;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infra.Data
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IConfiguration configuration, IMongoClient mongoClient) : base(configuration, mongoClient) { }
        
        public async Task<User> GetByEmail(string email)
        {
            return await _mongoCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
        }
            
    }
}