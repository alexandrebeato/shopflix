using Domain.Commands;
using Domain.Handlers.Contracts;
using Domain.Repositories;
using Flunt.Notifications;

namespace Domain.Handlers;

public class ItemHandler :
    Notifiable<Notification>,
    IHandler<CreateItemCommand>,
    IHandler<MarkItemAsPurchasedCommand>,
    IHandler<DeleteItemCommand>
{
    private readonly IItemRepository _repository;

    public ItemHandler(IItemRepository repository)
    {
        _repository = repository;
    }
    
    public GenericCommandResult Handle(CreateItemCommand command)
    {
        
        command.Validate();
        if (!command.IsValid)
            return new GenericCommandResult(false,
                "Oops, looks like anything is incorrect!",
                null,
                command.Notifications.Select(x => new {x.Key, x.Message}));

        var item = Items.Item.Factory.Create(command.UserId, command.Description, command.Quantity, command.Image);

        _repository.Insert(item);
        
        return new GenericCommandResult(true, "Item was created", item,null);
    }

    public GenericCommandResult Handle(MarkItemAsPurchasedCommand command)
    {
        var item = _repository.GetAndValidateOwner(command.Id, command.UserId).Result;
        if (item == null) return new GenericCommandResult(false, "Item not found", item, null);
        item.IsPurchased = true;
        item.PurchasedAt = DateTime.Now;
        _repository.Update(item);
        return new GenericCommandResult(true, "Item was purchased", item, null);
    }

    public GenericCommandResult Handle(DeleteItemCommand command)
    {
        var item = _repository.GetAndValidateOwner(command.ItemId, command.UserId).Result;
        if (item == null) return new GenericCommandResult(false, "Item not found", item, null);
        _repository.Delete(item.Id);
        return new GenericCommandResult(true, "Item was deleted", null,null);
    }
}