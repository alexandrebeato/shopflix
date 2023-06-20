using Domain.Repositories;
using Domain.Users;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using ThirdParty.Json.LitJson;

namespace Infra.Data
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IConfiguration configuration, IMongoClient mongoClient) : base(configuration, mongoClient) { }

        public Task<User> GetByEmail(string email) =>
            _mongoCollection.Find(x => x.Email == email).FirstOrDefaultAsync();

    }
}