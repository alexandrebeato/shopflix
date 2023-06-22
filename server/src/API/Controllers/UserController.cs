using API.Models.Users;
using AutoMapper;
using Domain.Commands;
using Domain.Commands.Contracts;
using Domain.Handlers;
using Domain.Users;
using Microsoft.AspNetCore.Mvc;
using SecureIdentity.Password;


namespace API.Controllers
{
    [Route("users")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("register")]
        public ICommandResult Register(
            [FromBody] RegisterUserModel model,
            [FromServices]UserHandler handler,
            [FromServices]IMapper mapper)
        {
            if (!ModelState.IsValid)
                return new GenericCommandResult(false,"Oops, looks like anything is wrong!", null);

            var command = new RegisterUserCommand(model.Name, model.Email, model.Password);
            
            command.Validate();
            if (!command.IsValid)
                return new GenericCommandResult(false,"Oops, looks like anything is incorrect!", command.Notifications);
            command.Password = PasswordHasher.Hash(command.Password);

             var result = handler.Handle(command);
             if (!result.Success) return result;
             var user = (User)result.Data!;
             result.Data = mapper.Map<User, UserModel>(user);
             return result;


        }
    }
}