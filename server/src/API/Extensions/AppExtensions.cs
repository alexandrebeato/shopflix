using System.Text;
using System.Text.Json.Serialization;
using API.Configurations;
using API.Services;
using Core.Domain.Interfaces;
using Domain.Handlers;
using Infra.CrossCutting.DependencyInjection;
using Infra.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;

namespace API.Extensions;

public static class AppExtensions
{

    public static void LoadConfiguration(this WebApplicationBuilder builder)
    {
        TokenConfiguration.JwtKey = builder.Configuration.GetValue<string>("JwtKey")!;
    }
    public static void ConfigureAuthentication(this WebApplicationBuilder builder)
    {
        var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtKey"]!);
        builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
    }
    public static void ConfigureMvc(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        })
        .AddJsonOptions(x =>
        {
            x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
    }

    public static void ConfigureServices(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration["mongoConnection"];

        // Mongo database
        var mongoClient = new MongoClient(connectionString);
        builder.Services.AddSingleton<IMongoClient>(mongoClient);
        builder.Services.AddTransient<UserHandler>();
        builder.Services.AddTransient<ItemHandler>();
        builder.Services.ConfigureAutoMapper();
        builder.Services.RegisterServices(builder.Configuration);
        builder.Services.AddTransient<TokenService>();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddCors(policeBuilder =>
            policeBuilder.AddDefaultPolicy(policy => policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod()));
        builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        builder.Services.AddSingleton<IUser, AspNetUser>();
        builder.Services.AddSwaggerGen(c =>
        {
            c.CustomSchemaIds(type => type.ToString());

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Add just the JWT Bearer token without 'Bearer' prefix",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Id = "Bearer",
                            Type = ReferenceType.SecurityScheme
                        }
                    },
                    new string[] { }
                }
            });
        });

    }
}