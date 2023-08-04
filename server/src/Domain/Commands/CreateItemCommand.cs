using System.ComponentModel.DataAnnotations;
using Domain.Commands.Contracts;
using Flunt.Notifications;
using Flunt.Validations;

namespace Domain.Commands;

public class CreateItemCommand : Notifiable<Notification>, ICommand
{
    public CreateItemCommand(string description)
    {
        Description = description;
    }

    public Guid UserId { get; set; }
    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }

    public void Validate()
    {
        AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsGreaterThan(Description, 2, "Description", "This description must be more than two characters!")
        );
    }
}