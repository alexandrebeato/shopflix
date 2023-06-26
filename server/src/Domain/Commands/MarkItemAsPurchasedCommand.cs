using System.ComponentModel.DataAnnotations;
using Domain.Commands.Contracts;

namespace Domain.Commands;

public class MarkItemAsPurchasedCommand : ICommand
{
    public MarkItemAsPurchasedCommand(Guid id)
    {
        Id = id;
    }
    
    public Guid Id { get; }
    public Guid UserId { get; set; } 
    
    public void Validate()
    {
        
    }
}