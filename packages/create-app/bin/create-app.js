#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const templates = {
  blank: {
    dependencies: {},
    app: `export default function App() {
  return (
    <main className="app">
      <h1>Welcome</h1>
      <p>Start building your React application.</p>
    </main>
  );
}
`,
  },
  dashboard: {
    dependencies: {
      "@pmcfernandes/app-shell": "app-shell",
      "@pmcfernandes/auth": "auth",
      "@pmcfernandes/form-editor": "form-editor",
      "@pmcfernandes/table-editor": "table-editor",
    },
    app: `import { AppShell, Card, Kpi, LanguageProvider, ThemeProvider } from "@pmcfernandes/app-shell";
import { FormViewer } from "@pmcfernandes/form-editor";
import { DataView } from "@pmcfernandes/table-editor";

const navigation = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
];

const projects = {
  title: "Projects",
  idKey: "id",
  data: [
    { id: 1, name: "Website refresh", owner: "Alex", status: "Active" },
    { id: 2, name: "Customer portal", owner: "Sam", status: "Planning" },
  ],
  columns: [
    { key: "name", label: "Project" },
    { key: "owner", label: "Owner" },
    { key: "status", label: "Status", type: "badge", badgeMap: { Active: "success", Planning: "warning" } },
  ],
};

const contactForm = {
  name: "Contact",
  fields: [{ name: "message", label: "Message", type: "textarea", required: true }],
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider initialLanguage="en">
        <AppShell
          title="Acme Operations"
          description="Project workspace"
          navigation={navigation}
          activeNavigationId="overview"
          breadcrumbs={[{ label: "Workspace" }, { label: "Overview" }]}
          userName="Alex Morgan"
          userEmail="alex@example.com"
        >
          <section className="dashboard-header">
            <div>
              <p className="eyebrow">Today</p>
              <h1>Good morning, Alex</h1>
            </div>
          </section>
          <section className="kpis">
            <Kpi title="Active projects" value="12" />
            <Kpi title="Tasks completed" value="84%" />
            <Kpi title="Team members" value="18" />
          </section>
          <section className="dashboard-grid">
            <Card><DataView config={projects} locale="en" /></Card>
            <Card>
              <h2>Quick note</h2>
              <FormViewer json={contactForm} onSubmit={(data) => console.log(data)} />
            </Card>
          </section>
        </AppShell>
      </LanguageProvider>
    </ThemeProvider>
  );
}
`,
  },
};

function help() {
  return `Usage: create-app <project-name> [options]

Projects are created inside ./projects/<project-name> when a projects
directory exists, otherwise inside ./<project-name>.

Options:
  -t, --template <name>  Template to use: dashboard (default) or blank
  -o, --output <dir>     Parent directory for the project (overrides the default)
  --no-install            Do not run npm install in the frontend directory
  -f, --force             Write into an existing directory
  -h, --help              Show this help message
`;
}

export function parseArgs(args) {
  const options = { force: false, install: true, output: null, template: "dashboard" };
  const positional = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--help" || argument === "-h") return { help: true };
    if (argument === "--no-install") options.install = false;
    else if (argument === "--force" || argument === "-f") options.force = true;
    else if (argument === "--template" || argument === "-t") {
      options.template = args[++index];
      if (!options.template) throw new Error(`${argument} requires a template name.`);
    } else if (argument === "--output" || argument === "-o") {
      options.output = args[++index];
      if (!options.output) throw new Error(`${argument} requires a directory.`);
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      positional.push(argument);
    }
  }

  if (positional.length !== 1) throw new Error("Provide exactly one project name.");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(positional[0])) {
    throw new Error("Project names must use lowercase letters, numbers, and hyphens.");
  }
  if (!templates[options.template]) {
    throw new Error(`Unknown template: ${options.template}. Choose dashboard or blank.`);
  }

  return { ...options, projectName: positional[0] };
}

function filesFor(projectName, templateName, frontendDirectory, backendUrl) {
  const template = templates[templateName];
  const frameworkPackages = resolve(dirname(fileURLToPath(import.meta.url)), "../../../packages");
  const frameworkDependencies = Object.fromEntries(
    Object.entries(template.dependencies).map(([packageName, folder]) => {
      const packagePath = resolve(frameworkPackages, folder);
      const path = relative(frontendDirectory, packagePath);
      const dependency = isAbsolute(path)
        ? pathToFileURL(packagePath).href
        : `file:${path.split(sep).join("/")}`;
      return [packageName, dependency];
    }),
  );
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.1.0",
    type: "module",
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: {
      ...frameworkDependencies,
      react: "^18.3.1",
      "react-dom": "^18.3.1",
      "react-router-dom": "^7.13.1",
    },
    devDependencies: {
      "@tailwindcss/vite": "^4.0.0",
      "@vitejs/plugin-react": "^4.3.4",
      tailwindcss: "^4.0.0",
      vite: "^6.0.0",
    },
  };

  return {
    ".gitignore": "node_modules\ndist\n.env.local\n",
    "README.md": `# ${projectName}\n\nCreated with [create-app](https://www.npmjs.com/package/create-app).\n\n## Commands\n\n\`npm run dev\` starts Vite.\n\`npm run build\` creates a production build.\n`,
    "index.html": `<div id="root"></div>\n<script type="module" src="/src/main.jsx"></script>\n`,
    "package.json": `${JSON.stringify(packageJson, null, 2)}\n`,
    "src/App.jsx": template.app,
    "src/api/.gitkeep": "",
    "src/components/.gitkeep": "",
    "src/index.css": `@import "tailwindcss";\n\n:root { color: #172033; background: #f5f7fb; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }\n* { box-sizing: border-box; }\nbody { margin: 0; }\n.app { max-width: 48rem; margin: 10rem auto; padding: 2rem; }\n.dashboard-header { margin-bottom: 1.5rem; }\n.dashboard-header h1 { margin: 0; }\n.eyebrow { color: #667085; font-size: .75rem; font-weight: 700; letter-spacing: .08em; margin: 0 0 .5rem; text-transform: uppercase; }\n.kpis { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 1.5rem; }\n.dashboard-grid { display: grid; gap: 1.5rem; grid-template-columns: minmax(0, 2fr) minmax(18rem, 1fr); }\n@media (max-width: 800px) { .kpis, .dashboard-grid { grid-template-columns: 1fr; } }\n`,
    "src/pages/.gitkeep": "",
    "src/services/.gitkeep": "",
    "src/main.jsx": `import { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\nimport App from "./App.jsx";\nimport "./index.css";\n${templateName === "dashboard" ? 'import "@pmcfernandes/app-shell/styles.css";\nimport "@pmcfernandes/auth/styles.css";\nimport "@pmcfernandes/form-editor/styles.css";\nimport "@pmcfernandes/table-editor/styles.css";\n' : ""}\n\ncreateRoot(document.getElementById("root")).render(\n  <StrictMode><App /></StrictMode>,\n);\n`,
    "vite.config.js": `import { defineConfig } from "vite";\nimport tailwindcss from "@tailwindcss/vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  build: { outDir: "../wwwroot", emptyOutDir: true },\n  server: {\n    port: 5173,\n    strictPort: true,\n    proxy: { "/api": "${backendUrl}" },\n  },\n});\n`,
  };
}

function appsettingsFor(projectName) {
  return `${JSON.stringify({
    ConnectionStrings: {
      Framework: "Server=(localdb)\\MSSQLLocalDB;Database=Framework.Data2;Trusted_Connection=True;TrustServerCertificate=True",
    },
    Jwt: { Secret: "", Issuer: "ImPedro", Audience: `${projectName}.Api`, ExpiryMinutes: 60 },
    ExternalAuthentication: {
      Google: { ClientId: "", ClientSecret: "" },
      Microsoft: { ClientId: "", ClientSecret: "" },
      Apple: { ClientId: "", ClientSecret: "" },
    },
    Initializer: {
      Enabled: false,
      ApplicationCode: "app",
      ApplicationName: projectName,
      ApplicationVersion: "1.00.00.00",
      AdminUsername: "admin",
      AdminPassword: "",
      AdminName: "Administrator",
      AdminEmail: "admin@example.com",
      AdministratorGroupName: "Administradores",
    },
    RoutePrefix: { Prefix: "" },
    Logging: {
      LogLevel: { Default: "Information", "Microsoft.AspNetCore": "Warning", Hangfire: "Warning" },
    },
    AllowedHosts: "*",
  }, null, 2)}\n`;
}

const linkedProjects = [
  "ImPedro.ConventionApi",
  "ImPedro.Data",
  "ImPedro.Entity",
  "ImPedro.Eloquent",
  "ImPedro.Jobs",
  "ImPedro.Mail",
  "ImPedro.Core",
  "ImPedro.Security",
  "ImPedro.Storage",
  "ImPedro.Query",
  "ImPedro.Api",
];

function frameworkProjectFiles() {
  const frameworkProjects = resolve(dirname(fileURLToPath(import.meta.url)), "../../../netcore");
  return linkedProjects.map((name) => resolve(frameworkProjects, name, `${name}.csproj`));
}

function addFrameworkReferences(projectDirectory) {
  const references = frameworkProjectFiles()
    .map((projectFile) => `    <ProjectReference Include="${relative(projectDirectory, projectFile).split(sep).join("/")}" />`)
    .join("\n");
  return `\n  <ItemGroup>\n${references}\n  </ItemGroup>\n`;
}

function spaProxyProjectXml() {
  return `\n  <PropertyGroup>\n    <SpaRoot>frontend\\</SpaRoot>\n    <SpaProxyServerUrl>http://localhost:5173</SpaProxyServerUrl>\n    <SpaProxyLaunchCommand>npm run dev</SpaProxyLaunchCommand>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="Microsoft.AspNetCore.SpaProxy" Version="10.0.12" />\n  </ItemGroup>\n`;
}

async function configureSpaProxy(target) {
  const launchSettingsFile = resolve(target, "Properties", "launchSettings.json");
  let backendUrl = "http://localhost:5168";
  try {
    const launchSettings = JSON.parse((await readFile(launchSettingsFile, "utf8")).replace(/^\uFEFF/, ""));
    const applicationUrl = launchSettings?.profiles?.http?.applicationUrl ?? "";
    const httpUrl = applicationUrl.split(";").find((entry) => entry.startsWith("http://"));
    if (httpUrl) backendUrl = httpUrl;
    for (const profile of Object.values(launchSettings.profiles ?? {})) {
      if (profile && typeof profile === "object") {
        profile.environmentVariables ??= {};
        profile.environmentVariables.ASPNETCORE_HOSTINGSTARTUPASSEMBLIES = "Microsoft.AspNetCore.SpaProxy";
      }
    }
    await writeFile(launchSettingsFile, `${JSON.stringify(launchSettings, null, 2)}\n`, "utf8");
  } catch {
    // Mantém os valores por omissão quando o modelo do `dotnet new` mudar.
  }
  return backendUrl;
}

export function resolveTargetDirectory(options, cwd = process.cwd()) {
  if (options.output) return resolve(cwd, options.output, options.projectName);
  const projectsDirectory = resolve(cwd, "projects");
  if (existsSync(projectsDirectory)) return resolve(projectsDirectory, options.projectName);
  return resolve(cwd, options.projectName);
}

export async function createProject(options, cwd = process.cwd()) {
  const target = resolveTargetDirectory(options, cwd);
  if (existsSync(target)) {
    const entries = await readdir(target);
    if (entries.length > 0 && !options.force) {
      throw new Error(`${options.projectName} already exists and is not empty. Use --force to continue.`);
    }
  }

  await runCommand("dotnet", [
    "new",
    "webapi",
    "--name",
    options.projectName,
    "--output",
    target,
    "--no-https",
    ...(options.force ? ["--force"] : []),
  ]);

  const projectFile = resolve(target, `${options.projectName}.csproj`);
  await writeFile(resolve(target, "appsettings.json"), appsettingsFor(options.projectName), "utf8");
  const backendUrl = await configureSpaProxy(target);
  const projectXml = await readFile(projectFile, "utf8");
  const referenceGroup = addFrameworkReferences(target);
  const frontendBuildTarget = `\n  <Target Name="BuildReactFrontend" BeforeTargets="Build">\n    <Exec Command="npm install" WorkingDirectory="$(MSBuildProjectDirectory)/frontend" />\n    <Exec Command="npm run build" WorkingDirectory="$(MSBuildProjectDirectory)/frontend" />\n  </Target>\n`;
  const updatedProjectXml = projectXml.replace("</Project>", `${referenceGroup}${spaProxyProjectXml()}${frontendBuildTarget}</Project>`);
  await writeFile(projectFile, updatedProjectXml, "utf8");

  const programFile = resolve(target, "Program.cs");
  await writeFile(programFile, `using ImPedro.Api.Bootstrap;\nusing ImPedro.Data.Initialization;\n\nvar builder = WebApplication.CreateBuilder(args);\nbuilder.Services.AddImPedroWebApi(builder.Configuration);\n// builder.Services.AddImPedroMinimalApi(builder.Configuration);\n\nvar app = builder.Build();\nif (builder.Configuration.GetValue<bool>("Initializer:Enabled"))\n{\n    await using var scope = app.Services.CreateAsyncScope();\n    await scope.ServiceProvider.GetRequiredService<IFrameworkInitializer>().InitializeAsync();\n}\n\napp.UseDefaultFiles();\napp.UseStaticFiles();\napp.UseImPedroWebApi();\n// app.UseImPedroMinimalApi();\napp.Run();\n`, "utf8");

  const frontendTarget = resolve(target, "frontend");
  for (const [relativePath, content] of Object.entries(filesFor(options.projectName, options.template, frontendTarget, backendUrl))) {
    const filePath = resolve(frontendTarget, relativePath);
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, content, "utf8");
  }

  const wwwroot = resolve(target, "wwwroot");
  await mkdir(wwwroot, { recursive: true });
  await writeFile(resolve(wwwroot, ".gitkeep"), "", "utf8");

  const solutionFile = resolve(target, `${options.projectName}.slnx`);
  await runCommand("dotnet", ["new", "sln", "--name", options.projectName, "--output", target, "--format", "slnx"]);
  await runCommand("dotnet", ["sln", solutionFile, "add", projectFile]);

  return target;
}

function runCommand(command, args, options = {}) {
  return new Promise((resolveInstall, rejectInstall) => {
    const child = spawn(command, args, {
      ...options,
      shell: process.platform === "win32",
      stdio: "inherit",
    });
    child.on("error", rejectInstall);
    child.on("exit", (code) => code === 0 ? resolveInstall() : rejectInstall(new Error(`npm install exited with code ${code}.`)));
  });
}

function install(target) {
  return runCommand("npm", ["install"], { cwd: resolve(target, "frontend") });
}

export async function main(args = process.argv.slice(2), cwd = process.cwd()) {
  const options = parseArgs(args);
  if (options.help) {
    console.log(help());
    return;
  }

  const target = await createProject(options, cwd);
  console.log(`Created .NET Web API and ${options.template} frontend in ${target}`);
  if (options.install) await install(target);
  console.log(`\nNext steps:\n  cd ${options.projectName}\n  dotnet run\n\nThe API and the Vite dev server (npm run dev) start together.`);
}

const isEntrypoint = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isEntrypoint) {
  main().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  });
}
