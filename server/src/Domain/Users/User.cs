using Core.Domain.Entities;

namespace Domain.Users
{
    public class User : Entity<User>
    {
        private User(Guid id, string name, string email, string password, DateTime createdAt)
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
                new User(id, name, email, password, createdAt);

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
    }
}
