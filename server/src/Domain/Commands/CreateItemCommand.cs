using System.ComponentModel.DataAnnotations;
using Domain.Commands.Contracts;
using Flunt.Notifications;
using Flunt.Validations;

namespace Domain.Commands;

public class CreateItemCommand :  Notifiable<Notification>, ICommand
{
    public CreateItemCommand(string description, double quantity, string? image)
    {
        Description = description;
        Quantity = quantity;
        Image = image;
    }

    public Guid UserId { get; set; }
    [Required(ErrorMessage="Description is required")]
    public string Description { get; set; }
    public double Quantity { get; set; }
    public string? Image { get; set; }
    
    public void Validate()
    {
        AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsGreaterThan(Description, 10, "Description", "This description must be more than ten characters!")
                .IsGreaterOrEqualsThan(Quantity, 0, "Quantity", "Invalid quantity!")
        );   
    }
}