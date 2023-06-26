using Core.Domain.Interfaces;
using Domain.Commands;
using Domain.Handlers;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

    [ApiController]
    [Route("items")]
    public class ItemController : BaseController
    {
        public ItemController(IUser user) : base(user) {}
        
    [HttpPost]
    [Route("")]
    [Authorize]
    public IActionResult Create(
        [FromBody]CreateItemCommand command,
        [FromServices]ItemHandler handler)
    {
        command.UserId = (Guid)UserId!;
        if (!ModelState.IsValid)
            return BadRequest(new GenericCommandResult(false,
                "Oops, looks like that lack anything!",
                null,
                ModelState.Select(x =>
                    new { x.Key, message = x.Value!.Errors[0].ErrorMessage })));
        try
        {
            var result = handler.Handle(command);

            return StatusCode(result.Success == false ? 403 : 201, result);
        }
        catch
        {
            return StatusCode(500, new GenericCommandResult(false, "Internal server error!", null, null));
        }
    }
    
    [HttpGet]
    [Route("")]
    [Authorize]
    public IActionResult GetAllByUser(
        [FromServices]IItemRepository repository)
    {
        if (!ModelState.IsValid)
            return BadRequest(new GenericCommandResult(false,
                "Oops, looks like that lack anything!",
                null,
                ModelState.Select(x =>
                    new { x.Key, message = x.Value!.Errors[0].ErrorMessage })));
        try
        {
            var items = repository.GetByUser((Guid)UserId!).Result;

            return StatusCode(201, new GenericCommandResult(true, "All items are returned", items, null));
        }
        catch
        {
            return StatusCode(500, new GenericCommandResult(false, "Internal server error!", null, null));
        }
    }
    
    [HttpPost]
    [Route("purchase")]
    [Authorize]
    public IActionResult MarkAsPurchase(
        [FromBody]MarkItemAsPurchasedCommand command,
        [FromServices]ItemHandler handler)
    {
        if (!ModelState.IsValid)
            return BadRequest(new GenericCommandResult(false,
                "Oops, looks like that lack anything!",
                null,
                ModelState.Select(x =>
                    new { x.Key, message = x.Value!.Errors[0].ErrorMessage })));
        command.UserId = (Guid)UserId!;
        try
        {
            var result = handler.Handle(command);

            return StatusCode(result.Success == false ? 404 : 202, result);
        }
        catch
        {
            return StatusCode(500, new GenericCommandResult(false, "Internal server error!", null, null));
        }
    }
    
    [HttpGet]
    [Route("{id:guid}")]
    [Authorize]
    public IActionResult Delete(
        [FromRoute]Guid id,
        [FromServices]ItemHandler handler)
    {
        var command = new DeleteItemCommand(id, (Guid)UserId!);

        try
        {
            var result = handler.Handle(command);

            return StatusCode(result.Success == false ? 403 : 204, result);
        }
        catch
        {
            return StatusCode(500, new GenericCommandResult(false, $"Internal server error!", null, null));
        }
    }
}