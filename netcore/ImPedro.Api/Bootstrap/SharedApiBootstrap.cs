using ImPedro.Api.Auth;
using ImPedro.Api.Middleware;
using ImPedro.Api.Validation;
using ImPedro.ConventionApi;
using ImPedro.ConventionApi.DependencyInjection;
using ImPedro.Core.DependencyInjection;
using ImPedro.Core.Validation;
using ImPedro.Data.DependencyInjection;
using ImPedro.Data.Initialization;
using ImPedro.Ddl.DependencyInjection;
using ImPedro.Entity;
using Microsoft.AspNetCore.Authentication;
using ImPedro.Jobs.DependencyInjection;
using ImPedro.Query.DependencyInjection;
using ImPedro.Security;
using ImPedro.Security.DependencyInjection;
using ImPedro.Security.Tokens;
using ImPedro.Storage.DependencyInjection;
using ImPedro.Workflow.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;

namespace ImPedro.Api.Bootstrap;

internal sealed class BootstrapMarker;

internal sealed class JwtEnabledMarker;

internal static class SharedApiBootstrap
{
    public static IServiceCollection AddServices(IServiceCollection services, IConfiguration configuration)
    {
        if (services.Any(d => d.ServiceType == typeof(BootstrapMarker))) return services;
        services.AddSingleton<BootstrapMarker>();

        var connectionString = configuration.GetConnectionString("Framework")
            ?? FrameworkDbContext.DefaultConnectionString;

        services.AddDbContext<FrameworkDbContext>(options => options.UseSqlServer(connectionString));
        services.AddImPedroData();
        services.Configure<FrameworkInitializerOptions>(configuration.GetSection("Initializer"));
        services.AddImPedroDdl();
        services.AddImPedroSecurity();
        services.AddImPedroQuery();
        services.AddImPedroJobs(options => options.StorageConnectionString = connectionString);
        services.AddImPedroStorage();
        services.AddImPedroWorkflow();
        services.AddConventionApi();
        services.AddScoped<IConventionApiAuthorizer, CurrentUserConventionApiAuthorizer>();
        services.Configure<JwtOptions>(configuration.GetSection("Jwt"));
        services.Configure<ExternalAuthenticationOptions>(configuration.GetSection("ExternalAuthentication"));
        services.Configure<RoutePrefixOptions>(configuration.GetSection("RoutePrefix"));
        services.AddApiValidators();
        services.AddImPedroCore(typeof(SharedApiBootstrap).Assembly);

        services
            .AddControllers(options =>
            {
                options.Filters.Add<ValidationActionFilter>();
                options.Filters.Add<FluentValidationActionFilter>();
            })
            .AddConventionApiControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = Json.LowerCaseNamingPolicy.Instance;
                options.JsonSerializerOptions.DictionaryKeyPolicy = Json.LowerCaseNamingPolicy.Instance;
            });
        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.PropertyNamingPolicy = Json.LowerCaseNamingPolicy.Instance;
            options.SerializerOptions.DictionaryKeyPolicy = Json.LowerCaseNamingPolicy.Instance;
        });

        var authentication = services.AddAuthentication();
        var external = configuration.GetSection("ExternalAuthentication").Get<ExternalAuthenticationOptions>() ?? new();
        if (external.Google.Enabled || external.Microsoft.Enabled || external.Apple.Enabled)
        {
            authentication.AddCookie("External", options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
                options.SlidingExpiration = false;
            });
        }
        if (external.Google.Enabled)
        {
            authentication.AddGoogle("Google", options =>
            {
                options.ClientId = external.Google.ClientId;
                options.ClientSecret = external.Google.ClientSecret;
                options.SignInScheme = "External";
                options.Scope.Add("profile");
                options.Scope.Add("email");
            });
        }
        if (external.Microsoft.Enabled)
        {
            authentication.AddMicrosoftAccount("Microsoft", options =>
            {
                options.ClientId = external.Microsoft.ClientId;
                options.ClientSecret = external.Microsoft.ClientSecret;
                options.SignInScheme = "External";
                options.Scope.Add("User.Read");
            });
        }
        if (external.Apple.Enabled)
        {
            authentication.AddOpenIdConnect("Apple", options =>
            {
                options.Authority = "https://appleid.apple.com";
                options.ClientId = external.Apple.ClientId;
                options.ClientSecret = external.Apple.ClientSecret;
                options.ResponseType = "code";
                options.SignInScheme = "External";
                options.CallbackPath = "/signin-apple";
                options.Scope.Clear();
                options.Scope.Add("openid");
                options.Scope.Add("email");
                options.Scope.Add("name");
            });
        }

        var jwtSecret = configuration["Jwt:Secret"] ?? string.Empty;
        if (jwtSecret.Length >= 32)
        {
            services.AddSingleton<JwtEnabledMarker>();
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(jwtBearer =>
                {
                    jwtBearer.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Jwt:Issuer"] ?? "ImPedro",
                        ValidAudience = configuration["Jwt:Audience"] ?? "ImPedro.Api",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
                        ClockSkew = TimeSpan.FromMinutes(2),
                    };
                });
        }

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(swagger =>
        {
            swagger.SwaggerDoc("v1", new OpenApiInfo { Title = "ImPedro API", Version = "v1" });
            swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Enter: Bearer {opaque or JWT token}",
            });
            swagger.AddSecurityRequirement(_ => new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecuritySchemeReference("Bearer"),
                    new List<string>()
                },
            });
        });

        return services;
    }

    public static WebApplication UsePipeline(WebApplication app)
    {
        var builder = (IApplicationBuilder)app;
        if (builder.Properties.ContainsKey("ImPedro.SharedPipeline")) return app;
        builder.Properties["ImPedro.SharedPipeline"] = true;

        app.UseImPedroExceptionHandler();
        app.UseRoutePrefix();
        app.UseAuthentication();
        app.UseImPedroAuth();

        app.UseSwagger();
        app.UseSwaggerUI();
        app.MapOpenApi();
        app.UseImPedroJobs();
        return app;
    }
}
