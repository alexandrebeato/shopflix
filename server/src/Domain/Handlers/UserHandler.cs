using Domain.Commands;
using Domain.Commands.Contracts;
using Domain.Handlers.Contracts;
using Domain.Repositories;
using Flunt.Notifications;

namespace Domain.Handlers;

public class UserHandler :
    Notifiable<Notification>,
    IHandler<RegisterUserCommand>
{
    
    private readonly IUserRepository _repository;

    public UserHandler(IUserRepository repository)
    {
        _repository = repository;
    }
    
    public ICommandResult Handle(RegisterUserCommand command)
    {
        var emailCheck = _repository.GetByEmail(command.Email);
        Console.WriteLine(emailCheck);
        // if (emailCheck != null)
        //     return new GenericCommandResult(false,"Oops, this email already exists!", null);
        
        command.Validate();
        if (!command.IsValid)
            return new GenericCommandResult(false,"Oops, looks like anything is incorrect!", command.Notifications);
        
        var user = Users.User.Factory.CreateNewUser(command.Id, command.Name, command.Email, command.Password, command.CreatedAt);

        _repository.Insert(user);

        return new GenericCommandResult(true, "User Registered", user);
    }
}