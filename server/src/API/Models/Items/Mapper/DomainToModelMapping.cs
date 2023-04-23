using AutoMapper;
using Domain.Items;

namespace API.Models.Items.Mapper
{
    public class DomainToModelMapping : Profile
    {
        public DomainToModelMapping() 
            => CreateMap<Item, ItemModel>();
    }
}