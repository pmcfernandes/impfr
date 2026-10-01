import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createProject, parseArgs } from "../bin/create-app.js";

test("parses supported options", () => {
  assert.deepEqual(parseArgs(["my-app", "--template", "blank", "--no-install"]), {
    force: false,
    install: false,
    projectName: "my-app",
    template: "blank",
  });
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
    assert.match(await readFile(join(target, "frontend", "src", "index.css"), "utf8"), /@import "tailwindcss";/);
    const projectFile = await readFile(join(target, "admin.csproj"), "utf8");
    assert.match(projectFile, /Name="BuildReactFrontend" BeforeTargets="Build"/);
    assert.match(projectFile, /Command="npm install"/);
    assert.match(projectFile, /Command="npm run build"/);
    assert.equal((projectFile.match(/WorkingDirectory="\$\(MSBuildProjectDirectory\)\/frontend"/g) ?? []).length, 2);
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
