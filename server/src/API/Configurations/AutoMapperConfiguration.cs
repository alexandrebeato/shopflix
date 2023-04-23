using AutoMapper;

namespace API.Configurations
{
    public static class AutoMapperConfiguration
    {
        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            if (services == null)
                return;

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new Models.Users.Mapper.DomainToModelMapping());
                mc.AddProfile(new Models.Items.Mapper.DomainToModelMapping());
            });

            services.AddSingleton(mapperConfig.CreateMapper());
        }
    }
}