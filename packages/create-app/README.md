# create-app

Create a full-stack project with an ASP.NET Core Web API and a Vite React frontend preconfigured with Tailwind CSS v4 and this framework's packages.

```bash
npx create-app my-app
```

The generated structure is:

```text
my-app/
  my-app.csproj
  my-app.slnx
  appsettings.json
  Program.cs
  wwwroot/             React production build output
  frontend/
    package.json
    vite.config.js     Builds into ../wwwroot
    src/
      api/
      components/
      pages/
      services/
```

The generated `.slnx` includes the new Web API and its framework project references. The Web API links the framework's .NET projects, excluding direct references to `ImPedro.Imaging`, `ImPedro.Ddl`, and `ImPedro.Workflow`. Its `Program.cs` registers both API bootstraps, enables static-file hosting, and optionally runs the framework initializer when `Initializer:Enabled` is enabled.

`appsettings.json` includes the SQL Server connection, JWT and external-authentication settings, route prefix, logging, and initializer defaults. Set secrets through environment variables or another secret provider before enabling authentication integrations or the initializer.

The dashboard's React packages are linked with `file:` dependencies to this repository's `packages/` folders, rather than downloaded from the package registry. Running `dotnet build` executes `npm install` and `npm run build` in `frontend/`; the React build goes to the root `wwwroot/` directory, which the Web API serves.

The default `dashboard` frontend includes `@pmcfernandes/app-shell`, `@pmcfernandes/form-editor`, and `@pmcfernandes/table-editor`. The `blank` template creates a plain Vite React frontend instead.

```bash
npx create-app my-app --template blank
npx create-app my-app --no-install
```

## Options

- `-t, --template <dashboard|blank>` selects a template. Default: `dashboard`.
- `--no-install` skips dependency installation immediately after scaffolding. A later `dotnet build` still runs `npm install` and `npm run build` as part of the project build.
- `-f, --force` allows writing into an existing directory. Existing files with matching names are replaced; files are never deleted.
- `-h, --help` prints usage.

After creation, run `cd my-app`, `dotnet run`, then `cd frontend` and `npm run dev`.
