using System.ComponentModel.DataAnnotations;
using Domain.Commands.Contracts;

namespace Domain.Commands;

public class MarkItemAsPurchasedCommand : ICommand
{
    public MarkItemAsPurchasedCommand(Guid id)
    {
        Id = id;
    }
    
    [Required(ErrorMessage = "Item id is required as a Guid")]
    public Guid Id { get; }

    public Guid UserId { get; set; } 
    
    public void Validate()
    {
        
    }
}