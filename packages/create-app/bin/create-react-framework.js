#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
      "@pmcfernandes/app-shell": "^1.0.0",
      "@pmcfernandes/form-editor": "^1.0.0",
      "@pmcfernandes/table-editor": "^1.0.0",
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
  return `Usage: create-react-framework <project-name> [options]

Options:
  -t, --template <name>  Template to use: dashboard (default) or blank
  --no-install            Do not run npm install after scaffolding
  -f, --force             Write into an existing directory
  -h, --help              Show this help message
`;
}

export function parseArgs(args) {
  const options = { force: false, install: true, template: "dashboard" };
  const positional = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--help" || argument === "-h") return { help: true };
    if (argument === "--no-install") options.install = false;
    else if (argument === "--force" || argument === "-f") options.force = true;
    else if (argument === "--template" || argument === "-t") {
      options.template = args[++index];
      if (!options.template) throw new Error(`${argument} requires a template name.`);
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

function filesFor(projectName, templateName) {
  const template = templates[templateName];
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.1.0",
    type: "module",
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: {
      ...template.dependencies,
      react: "^18.3.1",
      "react-dom": "^18.3.1",
    },
    devDependencies: { "@vitejs/plugin-react": "^4.3.4", vite: "^6.0.0" },
  };

  return {
    ".gitignore": "node_modules\ndist\n.env.local\n",
    "README.md": `# ${projectName}\n\nCreated with [create-react-framework](https://www.npmjs.com/package/create-react-framework).\n\n## Commands\n\n\`npm run dev\` starts Vite.\n\`npm run build\` creates a production build.\n`,
    "index.html": `<div id="root"></div>\n<script type="module" src="/src/main.jsx"></script>\n`,
    "package.json": `${JSON.stringify(packageJson, null, 2)}\n`,
    "src/App.jsx": template.app,
    "src/index.css": `:root { color: #172033; background: #f5f7fb; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }\n* { box-sizing: border-box; }\nbody { margin: 0; }\n.app { max-width: 48rem; margin: 10rem auto; padding: 2rem; }\n.dashboard-header { margin-bottom: 1.5rem; }\n.dashboard-header h1 { margin: 0; }\n.eyebrow { color: #667085; font-size: .75rem; font-weight: 700; letter-spacing: .08em; margin: 0 0 .5rem; text-transform: uppercase; }\n.kpis { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 1.5rem; }\n.dashboard-grid { display: grid; gap: 1.5rem; grid-template-columns: minmax(0, 2fr) minmax(18rem, 1fr); }\n@media (max-width: 800px) { .kpis, .dashboard-grid { grid-template-columns: 1fr; } }\n`,
    "src/main.jsx": `import { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\nimport App from "./App.jsx";\nimport "./index.css";\n${templateName === "dashboard" ? 'import "@pmcfernandes/app-shell/styles.css";\nimport "@pmcfernandes/form-editor/styles.css";\nimport "@pmcfernandes/table-editor/styles.css";\n' : ""}\n\ncreateRoot(document.getElementById("root")).render(\n  <StrictMode><App /></StrictMode>,\n);\n`,
    "vite.config.js": `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({ plugins: [react()] });\n`,
  };
}

export async function createProject(options, cwd = process.cwd()) {
  const target = resolve(cwd, options.projectName);
  if (existsSync(target)) {
    const entries = await readdir(target);
    if (entries.length > 0 && !options.force) {
      throw new Error(`${options.projectName} already exists and is not empty. Use --force to continue.`);
    }
  }

  for (const [relativePath, content] of Object.entries(filesFor(options.projectName, options.template))) {
    const filePath = resolve(target, relativePath);
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, content, "utf8");
  }

  return target;
}

function install(target) {
  return new Promise((resolveInstall, rejectInstall) => {
    const child = spawn("npm", ["install"], {
      cwd: target,
      shell: process.platform === "win32",
      stdio: "inherit",
    });
    child.on("error", rejectInstall);
    child.on("exit", (code) => code === 0 ? resolveInstall() : rejectInstall(new Error(`npm install exited with code ${code}.`)));
  });
}

export async function main(args = process.argv.slice(2), cwd = process.cwd()) {
  const options = parseArgs(args);
  if (options.help) {
    console.log(help());
    return;
  }

  const target = await createProject(options, cwd);
  console.log(`Created ${options.template} project in ${target}`);
  if (options.install) await install(target);
  console.log(`\nNext steps:\n  cd ${options.projectName}\n  npm run dev`);
}

const isEntrypoint = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isEntrypoint) {
  main().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  });
}
