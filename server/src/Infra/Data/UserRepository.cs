using Domain.Users;
using Domain.Repositories;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infra.Data
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IMongoClient mongoClient) : base(mongoClient) { }

        public async Task<User> GetByEmail(string email)
        {
            return await _mongoCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
        }

    }
}