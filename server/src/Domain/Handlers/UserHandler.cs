using Domain.Commands;
using Domain.Handlers.Contracts;
using Domain.Repositories;
using Flunt.Notifications;
using SecureIdentity.Password;

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
    
    public GenericCommandResult Handle(RegisterUserCommand command)
    {
        command.Validate();
        if (!command.IsValid)
            return  new GenericCommandResult(false,
                "Oops, looks like anything is incorrect!",
                null,
                command.Notifications.Select(x => new {x.Key, x.Message}));
        
        var emailCheck = _repository.GetByEmail(command.Email).Result;
        if (emailCheck != null!)
            return new GenericCommandResult(false,"Oops, this email already exists!", null, null);
        
        var user = Users.User.Factory.Create( command.Name, command.Email, PasswordHasher.Hash(command.Password));

        _repository.Insert(user!);
        
        return new GenericCommandResult(true, "User Registered", user,null);
    }

}