using System.ComponentModel.DataAnnotations;
using Domain.Commands.Contracts;
using Flunt.Notifications;
using Flunt.Validations;

namespace Domain.Commands;

public class RegisterUserCommand :  Notifiable<Notification>, ICommand
{
    public RegisterUserCommand(string name, string email, string password)
    {
        Name = name;
        Email = email;
        Password = password;
    }
    [Required(ErrorMessage="Name is required")]
    public string Name { get; }
    [Required(ErrorMessage="Email is required")]
    public string Email { get; } 
    [Required(ErrorMessage="Password is required")]
    public string Password {get; set; }

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
