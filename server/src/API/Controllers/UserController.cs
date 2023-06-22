using API.Models.Users;
using API.Services;
using AutoMapper;
using Domain.Commands;
using Domain.Commands.Contracts;
using Domain.Handlers;
using Domain.Repositories;
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
            [FromBody] RegisterUserCommand command,
            [FromServices]UserHandler handler,
            [FromServices]TokenService tokenService,
            [FromServices]IMapper mapper)
        {
            if (!ModelState.IsValid)
                return new GenericCommandResult(false,
                    "Oops, looks like that lack anything!",
                    null,
                    ModelState.Select(x => 
                        new{x.Key, message = x.Value!.Errors[0].ErrorMessage}));

            command.Validate();
            if (!command.IsValid)
                return new GenericCommandResult(false,
                    "Oops, looks like anything is incorrect!",
                    null,
                    command.Notifications.Select(x => new {x.Key, x.Message}));
            
            command.Password = PasswordHasher.Hash(command.Password);

             var result = handler.Handle(command);
             
             if (!result.Success) 
                 return result;
             
             var fullUser = (User)result.Data!;

             var token = tokenService.GenerateToken(fullUser);

             var user = mapper.Map<User, UserModel>(fullUser);
             
             result.Data = new {user, token} ;

             return result;
        }
        
        [HttpPost]
        [Route("login")]
        public async Task<GenericCommandResult> Login(
            [FromBody]LoginUserModel model,
            [FromServices]IUserRepository repository,
            [FromServices]TokenService tokenService)
        {
            if (!ModelState.IsValid)
                return new GenericCommandResult(false, 
                    "Oops, looks like that lack anything!",
                    null,
                    ModelState.Select(x => 
                    new{x.Key, message = x.Value!.Errors[0].ErrorMessage}));
            
            try
            {
                var user = await repository.GetByEmail(model.Email);
                if (user == null || !PasswordHasher.Verify(user.Password, model.Password))
                    return new GenericCommandResult(false,
                        "Your email or password is incorrect!",
                        null,
                        null);
                
                var token = tokenService.GenerateToken(user);
                
                return new GenericCommandResult(false, "Logged In!", token,null);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
            
            
        }
        
    }
}