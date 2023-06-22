using Domain.Commands;
using Domain.Commands.Contracts;

namespace Domain.Handlers.Contracts;

public interface IHandler<T> where T : ICommand
{
    GenericCommandResult Handle(T command);
}