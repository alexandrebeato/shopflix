using AutoMapper;
using Domain.Commands;
using Domain.Users;
using ZstdSharp.Unsafe;

namespace API.Models.Users.Mapper
{
    public class DomainToModelMapping : Profile
    {
        public DomainToModelMapping() =>
            CreateMap<User, UserModel>();

    }
}