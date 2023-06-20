using System.Security.Claims;
using Core.Domain.Entities;
using Core.Domain.Interfaces;

namespace Domain.Users
{
    public class User : Entity<User>, IUser
    {
        public User(Guid id, string name, string email, string password, DateTime createdAt)
        {
            Id = id;
            Name = name;
            Email = email;
            Password = password;
            CreatedAt = createdAt;
        }

        private User() { }

        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }

        public static class Factory
        {
            public static User Create(Guid id, string name, string email, string password, DateTime createdAt) =>
                new(id, name, email, password, createdAt);

            public static User CreateNewUser(Guid id, string name, string email, string password, DateTime createdAt) =>
                new()
                {
                    Id = id,
                    Name = name,
                    Email = email,
                    Password = password,
                    CreatedAt = createdAt
                };
        }

        public string Identity { get; }
        public Guid GetAuthenticatedUserId()
        {
            throw new NotImplementedException();
        }

        public string GetAuthenticatedUserName()
        {
            throw new NotImplementedException();
        }

        public bool IsAuthenticated()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Claim> GetPermissions()
        {
            throw new NotImplementedException();
        }
    }
}
