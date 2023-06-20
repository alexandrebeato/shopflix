using Flunt.Notifications;
using Flunt.Validations;

namespace Domain.Commands.Contracts;

public class RegisterUserCommand :  Notifiable<Notification>, ICommand
{
    public RegisterUserCommand(string name, string email, string password)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email;
        Password = password;
        CreatedAt = DateTime.Now;
    }
    public Guid Id { get; protected set; }
    public DateTime CreatedAt { get; protected set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password {get; set; } = null!;

    public void Validate()
    {
        AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsGreaterThan(Name, 3, "Name", "Your name must be more than three characters!")
                .IsEmail(Email,"Email", "Invalid e-mail!")
                .IsGreaterThan(Password, 6, "Password", "Your password must be more than six characters!")
        );
    }
}
