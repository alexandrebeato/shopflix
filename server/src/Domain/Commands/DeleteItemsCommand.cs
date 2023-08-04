using System.ComponentModel.DataAnnotations;
using Domain.Commands.Contracts;

namespace Domain.Commands;

public class DeleteItemsCommand : ICommand
{
    public DeleteItemsCommand(Guid itemId, Guid userId)
    {
        ItemId = itemId;
        UserId = userId;
    }

    [Required(ErrorMessage = "Item id is required")]
    public Guid ItemId { get; }

    public Guid UserId { get; }

    public void Validate()
    {

    }
}