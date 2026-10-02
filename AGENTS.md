# Project Creation Guide

## Identity and scope

- **Name:** Guide to creating management applications with React Framework.
- **Scope:** Instructions for agents starting from scratch or adding features to a project created with this repository. The recommended model is an ASP.NET Core API and a React/Vite interface, using React Router DOM for routing, Tailwind CSS v4 for styling, and Tremor as the design system; adapt the technology only when requested or required by the project.
- **Description:** Create accessible, consistent, production-ready applications by reusing `@pmcfernandes/app-shell`, `@pmcfernandes/auth`, `@pmcfernandes/form-editor`, and `@pmcfernandes/table-editor` when appropriate. Before implementation, identify the entities, users, permissions, operations, validations, and required endpoints.

## Getting started

1. Confirm the project name, purpose, users, functional scope, and technical requirements based on the request. If essential information is missing, ask; do not invent integrations, business rules, or credentials.
2. For a full-stack project created from this repository, prefer the local scaffolder instead of downloading/running a registry version with `npx`: from the repository root, run `node packages/create-app/bin/create-app.js <project-name>`. Pass `--template blank` only when a frontend without the dashboard setup is requested, and `--no-install` when installation needs to be deferred. Use `npx create-app <project-name>` only when the local scaffolder is unavailable or the user explicitly requests the published CLI.
3. Read the packages' `README.md` files before using them and follow the generated structure. Do not replace framework components with custom components without a functional need.
4. Use React Router DOM (`react-router-dom`) for client-side routing and Tailwind CSS v4 for utility-first styling. Follow the generated project's existing configuration and avoid adding a second routing or styling system without a functional need.
5. Use Tremor as the design system for dashboards, analytics, charts, and data-rich interfaces. Before implementing or changing this UI, consult the `tremor-design-system` skill. If it is not installed, install it with `npx skills add https://github.com/fefogarcia/approved-skills --skill tremor-design-system`. For new projects, prefer Tremor Raw unless the existing project already uses `@tremor/react` or another version is explicitly requested; check the project's setup before choosing components.
6. Keep secrets out of source code and version control; use environment-based configuration or a secret provider. Do not store passwords or authentication tokens in `localStorage`.
7. Implement loading, error, empty, and success states; validate on both client and server; and support keyboard accessibility with explicit labels.

## Project vs framework code

- All logic for application-specific tables lives in the **project**, never in the `netcore/ImPedro.*` framework packages. Framework packages change only for reusable, cross-cutting concerns (shared UI, auth, security, storage, workflow).
- For each new project table, create in the project: the EF entity (`Entities/`), a `DbContext` derived from `FrameworkDbContext` (`Data/`) with the `DbSet` and mapping, the DTO and request records (`Models/`), the application service (`Services/`, registered in `Program.cs`), and the API controller (`Controllers/`, discovered automatically from the entry assembly).
- The derived context reuses the framework-registered `DbContextOptions<FrameworkDbContext>` and must call `base.OnModelCreating(modelBuilder)` before its own mappings. Register it in `Program.cs` and use it in `EnsureCreatedAsync()`.
- Frontend code for the table (pages, components, forms, services) lives in the project's `frontend/src/`, reusing the framework packages without modifying them.

## Structure and App Shell

Use `AppShell` as the authenticated layout, with navigation suited to the functional areas, user details, breadcrumbs, and a sign-out action. Keep screens/pages, reusable components, and API calls in separate modules, following the existing structure in `frontend/src/` (`api/`, `components/`, `pages/`, `services/`).

Use React Router DOM to define application routes and connect navigation links to those routes. Keep authenticated route protection in sync with server/API authorization; client-side route guards improve navigation but do not replace server-side checks. Use Tailwind CSS v4 for application styling and retain the framework packages' required stylesheets.

Use Tremor components and patterns for dashboard and analytics interfaces, including KPI cards, charts, and data visualizations. Consult the `tremor-design-system` skill for component selection, APIs, and layout patterns. Detect whether the project uses Tremor Raw or `@tremor/react` before writing imports; default to Tremor Raw for a new project. Keep the existing framework packages for their respective responsibilities and do not introduce a competing design system.

```jsx
import { AppShell } from "@pmcfernandes/app-shell";
import "@pmcfernandes/app-shell/styles.css";

const navigation = [
  { id: "main", label: "Main", items: [
    { id: "dashboard", label: "Dashboard", href: "/" },
    { id: "customers", label: "Customers", href: "/customers" },
  ] },
];

export function AuthenticatedLayout({ user, onLogout, children }) {
  return (
    <AppShell
      title="Customer Management"
      description="Administration"
      navigation={navigation}
      userName={user.name}
      userEmail={user.email}
      onLogout={onLogout}
    >
      {children}
    </AppShell>
  );
}
```

## Login and access control

Use `Login` from `@pmcfernandes/auth` to collect credentials and connect `onSubmit` to a real authentication service. The server validates credentials, applies security policies, and returns the session; never treat the presence of a form alone as successful authentication. Wrap the authenticated application in `AuthProvider`, provide the validated user, and use `useAuth` for login/logout. Protect routes on the server/API as well; `CanAccess` and `useCanAccess` only control what is displayed in the interface.

```jsx
import { AuthProvider, Login, useAuth } from "@pmcfernandes/auth";
import "@pmcfernandes/auth/styles.css";

function SignIn() {
  const { login } = useAuth();
  return <Login onSubmit={async ({ email, password, rememberMe }) => {
    await login({ email, password, rememberMe });
  }} />;
}

export function Root() {
  return <AuthProvider
    onLogin={(credentials) => authService.login(credentials)}
    onLogout={() => authService.logout()}
  >
    <SignIn />
  </AuthProvider>;
}
```

The `authService` is application-specific and must communicate with the API, handle responses and errors, and follow the session strategy approved for the project. Do not include secrets or tokens in executable examples.

## Tables, forms, and data operations

- **Tables:** Use `DataView` from `@pmcfernandes/table-editor` for lists and data views. Explicitly define `idKey`, columns, and view modes, and fetch data from the API. Do not treat `DataView`'s local data as persisted unless changes are sent to the server.
- **Forms:** Use `FormViewer` to display or fill out a configured form, and `FormEditor` when the form definition needs to be edited. For simple, specific forms, use accessible HTML inputs or the project's UI components. Validate critical rules in the API as well.
- **Read:** Use `GET` for lists and individual records. Use `useGetList`/`useGetOne` or the existing service; show loading, error, and empty states, and allow refreshing the list after changes.
- **Create:** Use `POST` with the allowed fields; validate and normalize on the server. Use `useCreate` or the existing service, and provide success/error feedback.
- **Edit:** Use `PUT`/`PATCH` on the identified resource; load existing values, validate changes, and update the view after success. `useUpdate` uses `PUT {url}/{id}` by default (override via `method`, e.g. `{ method: "PATCH" }`).
- **Delete:** Use `DELETE {url}/{id}`; ask for confirmation before destructive actions, validate authorization on the server, and update the list after success. Use `useDelete` or `useDeleteMany` for batch operations.
- Never trust IDs, permissions, validations, or filters sent by the browser. Validate authorization and input in every endpoint, and use parameterized database access.

Example of a table connected to an API (adapt the fields/endpoints to the domain):

```jsx
import { useGetList, useDelete } from "@pmcfernandes/app-shell";
import { DataView } from "@pmcfernandes/table-editor";
import "@pmcfernandes/table-editor/styles.css";

export function CustomersPage() {
  const { data, error, isLoading, refetch } = useGetList("/api/customers");
  const { remove } = useDelete("/api/customers");

  if (isLoading) return <p>Loading customers…</p>;
  if (error) return <p role="alert">Could not load customers.</p>;

  return <DataView
    config={{
      title: "Customers",
      idKey: "id",
      data: data ?? [],
      columns: [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
      ],
    }}
    onDeleteSelected={async (ids) => {
      await Promise.all(ids.map((id) => remove(id)));
      await refetch();
    }}
  />;
}
```

### REST hook examples

The `@pmcfernandes/app-shell` hooks use `fetch` and return loading/error state for API operations. Keep them in React components or custom hooks, and refresh list data after successful mutations.

```jsx
import {
  useGetList,
  useGetOne,
  useCreate,
  useUpdate,
  useDelete,
} from "@pmcfernandes/app-shell";

function CustomersPage({ customerId }) {
  // GET /api/customers
  const customers = useGetList("/api/customers");

  // GET /api/customers/{customerId}; pass null when there is no selection
  const customer = useGetOne("/api/customers", customerId, {
    enabled: customerId != null,
  });

  // POST /api/customers with the supplied JSON payload
  const createCustomer = useCreate("/api/customers");

  // PATCH /api/customers/{id} with the supplied JSON payload
  const updateCustomer = useUpdate("/api/customers");

  // DELETE /api/customers/{id}
  const deleteCustomer = useDelete("/api/customers");

  async function handleCreate(values) {
    await createCustomer.create(values);
    await customers.refetch();
  }

  async function handleUpdate(id, values) {
    await updateCustomer.update(id, values);
    await customers.refetch();
  }

  async function handleDelete(id) {
    await deleteCustomer.remove(id);
    await customers.refetch();
  }

  if (customers.isLoading) return <p>Loading customers…</p>;
  if (customers.error) return <p role="alert">Could not load customers.</p>;

  return (
    <CustomerList
      customers={customers.data ?? []}
      selectedCustomer={customer.data}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
```

`useGetList` and `useGetOne` return `data`, `error`, `isLoading`, and `refetch`. Mutation hooks such as `useCreate`, `useUpdate`, and `useDelete` return the operation function together with `data`, `error`, and `isLoading`. Use each mutation's `isLoading`/`error` state to disable duplicate submissions and show actionable feedback. The hooks accept optional native `fetch` options as their final argument when the API requires headers or other request configuration.

To create/edit with `FormViewer`, connect `onSubmit` to `POST` and `onSave` to `PATCH`/`PUT`, respectively. For create/edit/delete operations in tables, ensure callbacks call the API and refresh the displayed data; show a confirmation before deleting.

## C# backend: models, authentication, users, groups, and permissions

For a full-stack project, use the existing .NET projects and services instead of recreating their responsibilities in endpoints. Read the relevant documentation in `netcore/docs/` and register the framework services in dependency injection. `ImPedro.Eloquent` works with EF Core entities in the configured `DbContext`; its ambient context must be set with `Eloquent.Use(context)` or the `UseEloquent()` middleware.

### Create and use an Eloquent model

The generated `ImPedro.Entity` types (for example `MetaUser`) are regular EF Core POCO entities and can be queried through Eloquent without inheriting from `Model`. `Model` is an optional base class for custom entities; any custom entity must also be configured in the EF Core `DbContext` before querying or saving it.

```csharp
using ImPedro.Eloquent;
using ImPedro.Entity;
using ImPedro.Entity.Entities;

public static async Task<IReadOnlyList<MetaUser>> FindActiveUsersAsync(
    FrameworkDbContext db,
    CancellationToken cancellationToken = default)
{
    using (Eloquent.Use(db))
    {
        return await Eloquent.Query<MetaUser>()
            .Where(user => !user.IsDeleted && !user.IsGroup)
            .OrderBy(user => user.Username)
            .GetAsync(cancellationToken);
    }
}
```

For a custom model, use `Fillable` to explicitly allow mass assignment and keep protected fields out of the fillable list. The entity still needs EF Core mapping (for example, a `DbSet<Customer>` and table/key configuration).

```csharp
using ImPedro.Eloquent;

public sealed class Customer : Model
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public override IReadOnlyList<string> Fillable => [nameof(Name), nameof(Email)];
}

// Within an active Eloquent.Use(db) scope, create and persist a mapped entity:
var customer = new Customer();
customer.Fill(new Dictionary<string, object?>
{
    [nameof(Customer.Name)] = "Ana Silva",
    [nameof(Customer.Email)] = "ana@example.com",
});
await customer.SaveAsync(cancellationToken);
```

### Login

Use `AuthService.LoginAsync` in backend services or call the existing `POST /api/auth/login` endpoint from the frontend. A successful `AuthResult` contains the user and session token; the API endpoint can also issue a JWT when configured. Do not implement a second credential store or authenticate by trusting client-provided user data.

```csharp
var result = await authService.LoginAsync(username, password, cancellationToken);
if (!result.Success)
{
    // Return an authentication failure (the API endpoint returns 401).
    return Results.Unauthorized();
}

return Results.Ok(new { result.User, result.Token, result.JwtToken });
```

### Create a user

Use `AuthService.RegisterAsync` when the operation should validate username/email uniqueness and return a logged-in result. Use `UserService.CreateAsync` for administrative user creation when the endpoint/service owns password handling and validation. Never accept a pre-hashed password, user ID, or permission set from an untrusted client as authoritative.

```csharp
using ImPedro.Security.Models;

var result = await authService.RegisterAsync(
    new RegisterRequest(
        Username: request.Username,
        Email: request.Email,
        Password: request.Password,
        Fullname: request.Fullname,
        GroupIds: request.GroupIds),
    cancellationToken);

if (!result.Success) return Results.BadRequest(result);
return Results.Ok(result); // Includes the authenticated user and token.
```

### Create a group and add a user

Groups are represented by `MetaUser` rows where `IsGroup` is `true`. Use `GroupService` and `UserService` rather than creating those rows or join records ad hoc.

```csharp
var group = await groupService.CreateGroupAsync(
    name: "Managers",
    email: null,
    description: "Management team",
    cancellationToken);

await groupService.AddMemberAsync(group.IDUser, userId, cancellationToken);
```

### Define, assign, and check permissions

Permission definitions are catalog data: `MetaTypePermission` identifies the resource/table, and `MetaPermission` identifies an action code such as `SELECT`, `INSERT`, `UPDATE`, or `DELETE`. Create or seed those definitions through the `FrameworkDbContext` and avoid duplicates. Granting permissions is a separate operation: assign existing table/action pairs to a group with `GroupService.SetGroupPermissionsAsync`.

```csharp
using ImPedro.Security.Models;

// Definitions should normally be seeded once by a database initializer/migration.
db.MetaTypePermissions.Add(new MetaTypePermission
{
    Tablename = "customers",
    TypePermission0 = "Customers",
    IDField = "IDCustomer",
    FieldCaption = "Name",
});
db.MetaPermissions.Add(new MetaPermission
{
    CodPermission = "SELECT",
    PermissionCaption0 = "View",
});
await db.SaveChangesAsync(cancellationToken);

// Grant existing definitions to a group. This replaces that group's current assignments.
await groupService.SetGroupPermissionsAsync(
    groupId,
    [new PermissionAssignment("customers", "SELECT")],
    cancellationToken);
```

Check access in server-side code through `ICurrentUser` or `AccessControlService`; secure every endpoint independently of frontend visibility. For Minimal API endpoints, use the framework filter:

```csharp
app.MapDelete("/api/customers/{id:int}", DeleteCustomerAsync)
    .AddEndpointFilter(RequirePermissionFilter.For("customers", "DELETE"));

// In an application service when the current-user context is available:
await currentUser.RequirePermissionAsync("customers", "DELETE", cancellationToken);
```

`AccessControlService.GetEffectivePermissionsAsync(userId)` returns effective direct and group-inherited permissions in `resource.ACTION` format; `HasAccessAsync(userId, resource, action)` checks an individual permission. Keep authorization checks on the API/server even when using `CanAccess` in React.

## Code and verification

- Keep naming and language consistent with the project; the default interface language is Portuguese (`locale="pt"`).
- Reuse existing services and patterns. Avoid coupling network logic, business rules, and presentation in a single component.
- After changing code, run the available checks for the affected project (for example, `dotnet build` for the backend and `npm run build` in `frontend/`). Fix any errors introduced and summarize what was created and how it was verified.
