using API.Controllers;
using API.Models.Users;
using API.Services;
using AutoMapper;
using Core.Domain.Interfaces;
using Domain.Commands;
using Domain.Handlers;
using Domain.Repositories;
using Domain.Users;
using Microsoft.AspNetCore.Mvc;
using SecureIdentity.Password;

namespace API.Controllers;

    [ApiController]
    [Route("users")]
    public class UserController : BaseController
    {
        public UserController(IUser user) : base(user) {}
        
        [HttpPost]
        [Route("register")]
        public IActionResult Register(
            [FromBody]RegisterUserCommand command,
            [FromServices]UserHandler handler,
            [FromServices]TokenService tokenService,
            [FromServices]IMapper mapper)
        {
            if (!ModelState.IsValid)
                return BadRequest(new GenericCommandResult(false,
                    "Oops, looks like that lack anything!",
                    null,
                    ModelState.Select(x =>
                        new { x.Key, message = x.Value!.Errors[0].ErrorMessage })));
            
            try
            {
                var result = handler.Handle(command);

                if (!result.Success)
                    return StatusCode(403, result);
             
                var fullUser = (User)result.Data!;

                var token = tokenService.GenerateToken(fullUser);

                var user = mapper.Map<User, UserModel>(fullUser);
             
                result.Data = new {user, token} ;

                return StatusCode(201, result);
            }
            catch
            {
                return StatusCode(500, new GenericCommandResult(false, "Internal server error!", null, null));
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(
            [FromBody]LoginUserModel model,
            [FromServices]IUserRepository repository,
            [FromServices]TokenService tokenService)
        {
            if (!ModelState.IsValid)
                return BadRequest(new GenericCommandResult(false, 
                    "Oops, looks like that lack anything!",
                    null,
                    ModelState.Select(x => 
                        new{x.Key, message = x.Value!.Errors[0].ErrorMessage})));
            
            try
            {
                var user = await repository.GetByEmail(model.Email);
                if (user == null || !PasswordHasher.Verify(user.Password, model.Password))
                    return Unauthorized(new GenericCommandResult(false,
                        "Your email or password is incorrect!",
                        null,
                        null));
                
                var token = tokenService.GenerateToken(user);
                
                return Ok(new GenericCommandResult(true, $"Logged In!", new {token},null));
            }
            catch
            {
                return StatusCode(500, new GenericCommandResult(false, "Internal server error!", null, null));
            }
        }
    }
