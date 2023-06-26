using System.Security.Claims;
using System.Text.Json.Serialization;
using Core.Domain.Entities;
using Core.Domain.Interfaces;

namespace Domain.Users
{
    public class User : Entity<User>
    {
        public User(string name, string email, string password)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            Password = password;
            CreatedAt = DateTime.Now;
        }

        private User()
        {
        }

        public string Name { get; private set; } = null!;
        public string Email { get; private set; } = null!;
        [JsonIgnore]
        public string Password { get; private set; } = null!;

        public static class Factory
        {
            public static User Create(string name, string email, string password) =>
                new(name, email, password);

            public static User CreateNewUser(Guid id, string name, string email, string password,
                DateTime createdAt) =>
                new()
                {
                    Id = id,
                    Name = name,
                    Email = email,
                    Password = password,
                    CreatedAt = createdAt
                };
        }

    }
}
