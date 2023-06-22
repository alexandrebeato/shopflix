using Domain.Commands;
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
    
    public GenericCommandResult Handle(RegisterUserCommand command)
    {
        var emailCheck = _repository.GetByEmail(command.Email).Result;
        if (emailCheck != null!)
            return new GenericCommandResult(false,"Oops, this email already exists!", null, null);
        
        var user = Users.User.Factory.CreateNewUser(command.Id, command.Name, command.Email, command.Password, command.CreatedAt);

        _repository.Insert(user!);
        
        return new GenericCommandResult(true, "User Registered", user,null);
    }

}