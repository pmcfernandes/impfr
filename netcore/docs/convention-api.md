# ImPedro.ConventionApi

Converts DI-registered application services into MVC controllers without creating a controller class per service. By default, implementations ending in `AppService` are discovered when `AddConventionApi()` is called before `AddControllers()`.

```csharp
services.AddScoped<CustomerAppService>();
services.AddConventionApi();
services.AddControllers().AddConventionApiControllers();
```

The example creates a controller at `/api/services/customer`. Read methods whose names start with `Get`, `Find`, `List`, `Query`, `Count`, or `Exists` become `GET /api/services/customer/{operation}`. Other methods become `POST` with the same pattern. `Async` is removed and PascalCase becomes kebab-case: `GetOrdersAsync` becomes `GET /api/services/customer/get-orders`.

GET arguments are received from the query string. POST arguments are received in a JSON object with parameter names. `CancellationToken` is supplied automatically from the request.

## Security

The module requires `IConventionApiAuthorizer`; without it, the controller cannot be activated. The main API registers `CurrentUserConventionApiAuthorizer`, which requires an authenticated `ICurrentUser`. A host can replace the implementation to apply permissions per service or operation.

To include a service whose name does not end in `AppService`, use:

```csharp
services.AddConventionApi(options => options.Include<InventoryService>());
```
