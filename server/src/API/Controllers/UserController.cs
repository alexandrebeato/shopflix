using API.Models.Users;
using AutoMapper;
using Core.Domain.Interfaces;
using Domain.Commands;
using Domain.Commands.Contracts;
using Domain.Handlers;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("users")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("register")]
        
        
        public async Task<GenericCommandResult> Register(
            [FromBody] RegisterUserModel model,
            [FromServices]UserHandler handler)
        {
            if (!ModelState.IsValid)
                return new GenericCommandResult(false,"Oops, looks like anything is wrong!", ModelState.ToList());
            var command = new RegisterUserCommand(model.Name, model.Email, model.Password);
            return (GenericCommandResult)handler.Handle(command);
        }
    }
}