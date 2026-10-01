import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createProject, parseArgs, resolveTargetDirectory } from "../bin/create-app.js";

test("parses supported options", () => {
  assert.deepEqual(parseArgs(["my-app", "--template", "blank", "--no-install"]), {
    force: false,
    install: false,
    output: null,
    projectName: "my-app",
    template: "blank",
  });
});

test("parses the output directory", () => {
  assert.equal(parseArgs(["my-app", "-o", "apps"]).output, "apps");
});

test("creates the project inside the projects folder when present", async () => {
  const directory = await mkdtemp(join(tmpdir(), "create-app-"));
  try {
    await mkdir(join(directory, "projects"), { recursive: true });
    assert.equal(
      resolveTargetDirectory({ projectName: "my-app" }, directory),
      join(directory, "projects", "my-app"),
    );
    assert.equal(
      resolveTargetDirectory({ projectName: "my-app", output: "apps" }, directory),
      join(directory, "apps", "my-app"),
    );
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});

test("creates the project in the working directory without a projects folder", async () => {
  const directory = await mkdtemp(join(tmpdir(), "create-app-"));
  try {
    assert.equal(
      resolveTargetDirectory({ projectName: "my-app" }, directory),
      join(directory, "my-app"),
    );
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});

test("rejects unsafe project names", () => {
  assert.throws(() => parseArgs(["../my-app"]), /lowercase letters/);
});

test("creates a dashboard project", async () => {
  const directory = await mkdtemp(join(tmpdir(), "create-app-"));
  try {
    const target = await createProject({ force: false, install: false, projectName: "admin", template: "dashboard" }, directory);
    assert.equal(existsSync(join(target, "admin.csproj")), true);
    assert.equal(existsSync(join(target, "admin.slnx")), true);
    assert.equal(existsSync(join(target, "frontend", "src", "App.jsx")), true);
    for (const folder of ["components", "pages", "services", "api"]) {
      assert.equal(existsSync(join(target, "frontend", "src", folder, ".gitkeep")), true);
    }
    const packageJson = JSON.parse(await readFile(join(target, "frontend", "package.json"), "utf8"));
    assert.match(packageJson.dependencies["@pmcfernandes/app-shell"], /^file:/);
    assert.match(packageJson.dependencies["@pmcfernandes/auth"], /^file:/);
    assert.doesNotMatch(packageJson.dependencies["@pmcfernandes/app-shell"], /file:\.\/[A-Za-z]:/);
    assert.match(packageJson.dependencies["@pmcfernandes/form-editor"], /packages\/form-editor$/);
    assert.match(packageJson.dependencies["@pmcfernandes/table-editor"], /packages\/table-editor$/);
    assert.equal(packageJson.devDependencies["@tailwindcss/vite"], "^4.0.0");
    assert.equal(packageJson.devDependencies.tailwindcss, "^4.0.0");
    assert.match(await readFile(join(target, "frontend", "src", "main.jsx"), "utf8"), /@pmcfernandes\/table-editor\/styles.css/);
    const viteConfig = await readFile(join(target, "frontend", "vite.config.js"), "utf8");
    assert.match(viteConfig, /outDir: "\.\.\/wwwroot"/);
    assert.match(viteConfig, /tailwindcss\(\)/);
    assert.match(viteConfig, /port: 5173/);
    assert.match(viteConfig, /"\/api": "http:\/\/localhost:/);
    assert.match(await readFile(join(target, "frontend", "src", "index.css"), "utf8"), /@import "tailwindcss";/);
    const projectFile = await readFile(join(target, "admin.csproj"), "utf8");
    assert.match(projectFile, /Name="BuildReactFrontend" BeforeTargets="Build"/);
    assert.match(projectFile, /Command="npm install"/);
    assert.match(projectFile, /Command="npm run build"/);
    assert.equal((projectFile.match(/WorkingDirectory="\$\(MSBuildProjectDirectory\)\/frontend"/g) ?? []).length, 2);
    assert.match(projectFile, /Microsoft\.AspNetCore\.SpaProxy/);
    assert.match(projectFile, /<SpaRoot>frontend\\<\/SpaRoot>/);
    assert.match(projectFile, /<SpaProxyLaunchCommand>npm run dev<\/SpaProxyLaunchCommand>/);
    assert.match(projectFile, /<SpaProxyServerUrl>http:\/\/localhost:5173<\/SpaProxyServerUrl>/);
    const launchSettings = JSON.parse(await readFile(join(target, "Properties", "launchSettings.json"), "utf8"));
    assert.equal(launchSettings.profiles.http.environmentVariables.ASPNETCORE_HOSTINGSTARTUPASSEMBLIES, "Microsoft.AspNetCore.SpaProxy");
    for (const project of ["ConventionApi", "Data", "Entity", "Eloquent", "Jobs", "Mail", "Core", "Security", "Storage", "Query"]) {
      assert.match(projectFile, new RegExp(`ImPedro\\.${project}\\/ImPedro\\.${project}\\.csproj`));
    }
    for (const excluded of ["Ddl", "Imaging", "Workflow"]) {
      assert.doesNotMatch(projectFile, new RegExp(`ImPedro\\.${excluded}\\/`));
    }
    const program = await readFile(join(target, "Program.cs"), "utf8");
    assert.match(program, /AddImPedroWebApi/);
    assert.match(program, /AddImPedroMinimalApi/);
    assert.match(program, /app\.UseStaticFiles\(\)/);
    assert.match(program, /IFrameworkInitializer/);
    const appsettings = JSON.parse(await readFile(join(target, "appsettings.json"), "utf8"));
    assert.equal(appsettings.Initializer.Enabled, false);
    assert.equal(appsettings.Initializer.AdminPassword, "");
    assert.equal(existsSync(join(target, "wwwroot", ".gitkeep")), true);
  } finally {
     await rm(directory, { force: true, recursive: true });
  }
});
