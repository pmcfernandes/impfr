using ImPedro.Api.Bootstrap;
using ImPedro.Data.Initialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddImPedroWebApi(builder.Configuration);
builder.Services.AddImPedroMinimalApi(builder.Configuration);

var app = builder.Build();
if (builder.Configuration.GetValue<bool>("Initializer:Enabled"))
{
    await using var scope = app.Services.CreateAsyncScope();
    await scope.ServiceProvider.GetRequiredService<IFrameworkInitializer>().InitializeAsync();
}
app.UseImPedroWebApi();
app.UseImPedroMinimalApi();
app.Run();
