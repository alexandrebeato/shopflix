using AutoMapper;
using Domain.Users;

namespace API.Models.Users.Mapper
{
    public class DomainToModelMapping : Profile
    {
        public DomainToModelMapping() 
            => CreateMap<User, UserModel>();
    }
}