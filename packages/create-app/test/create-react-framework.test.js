import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createProject, parseArgs } from "../bin/create-react-framework.js";

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
  const directory = await mkdtemp(join(tmpdir(), "create-react-framework-"));
  try {
    const target = await createProject({ force: false, install: false, projectName: "admin", template: "dashboard" }, directory);
    assert.equal(existsSync(join(target, "src", "App.jsx")), true);
    const packageJson = JSON.parse(await readFile(join(target, "package.json"), "utf8"));
    assert.equal(packageJson.dependencies["@pmcfernandes/app-shell"], "^1.0.0");
    assert.match(await readFile(join(target, "src", "main.jsx"), "utf8"), /@pmcfernandes\/table-editor\/styles.css/);
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});
