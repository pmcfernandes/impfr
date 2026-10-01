# React Framework

A collection of reusable React libraries for building management interfaces, authentication, configurable forms, and data views. Each package is independent, includes a Vite example in `samples/`, and can be published and consumed separately.

## Packages

| Package | Description | Documentation |
| --- | --- | --- |
| `@pmcfernandes/app-shell` | Structure for back-office applications and dashboards, with a sidebar, header, UI components, REST hooks, themes, and internationalization. | [`packages/app-shell/README.md`](packages/app-shell/README.md) |
| `@pmcfernandes/form-editor` | JSON configuration-driven form editor and viewer. | [`packages/form-editor/README.md`](packages/form-editor/README.md) |
| `@pmcfernandes/table-editor` | JSON data viewing and editing in tables, lists, or cards. | [`packages/table-editor/README.md`](packages/table-editor/README.md) |
| `@pmcfernandes/auth` | Components and context for authentication, profiles, groups, and permissions. | [`packages/auth/README.md`](packages/auth/README.md) |
| `create-app` | CLI for scaffolding Vite React projects with framework boilerplate. | [`packages/create-app/README.md`](packages/create-app/README.md) |

## Requirements

- A current Node.js version with npm
- React and React DOM 18 or later in the consuming application

## Installation

Install only the packages required by your React application:

```bash
npm install @pmcfernandes/app-shell @pmcfernandes/form-editor @pmcfernandes/table-editor @pmcfernandes/auth
```

Import each used library's stylesheet once:

```jsx
import "@pmcfernandes/app-shell/styles.css";
import "@pmcfernandes/form-editor/styles.css";
import "@pmcfernandes/table-editor/styles.css";
import "@pmcfernandes/auth/styles.css";
```

## Quick Start

```jsx
import { AppShell } from "@pmcfernandes/app-shell";
import { Login } from "@pmcfernandes/auth";
import { FormViewer } from "@pmcfernandes/form-editor";
import { DataView } from "@pmcfernandes/table-editor";

export function App() {
  return (
    <AppShell title="Backoffice">
      <Login onSubmit={(credentials) => authenticate(credentials)} />
      <FormViewer json={{ name: "Contact", fields: [] }} onSubmit={console.log} />
      <DataView config={{ data: [{ id: 1, name: "Example" }] }} onChange={console.log} />
    </AppShell>
  );
}
```

See the documentation for each package for all props, configuration formats, and complete examples.

## Integrated Demo

The [`demo/`](demo/) directory contains a Vite application that showcases all four packages in one back-office flow:

- Dashboard with KPIs, bar/line/donut charts, and panel containers.
- Project data in table, list, and card views via `@pmcfernandes/table-editor`.
- Simple and multi-step (wizard) forms with conditional fields, file upload, consent, and API-powered selects via `@pmcfernandes/form-editor`, plus the JSON form editor.
- A `/api/*` in-browser mock (latency + `localStorage` persistence) driving every REST hook: `useGetList`, `useGetOne`, `useGetMany`, `useInfiniteGetList`, `useCreate`, `useUpdate`, `useDelete`, `useDeleteMany`, `useStore`, and `fetchJson`.
- A gallery of `@pmcfernandes/app-shell` primitives: alerts, accordion, tabs, buttons, badges, dialogs, drawers, confirm dialogs, wizards, and tables.
- Every `@pmcfernandes/auth` screen: sign in with Remember me (persisted session), register, forgot password, change password, edit profile, groups and permissions, and `CanAccess` permission gates.

Run it locally:

```bash
cd demo
npm install
npm run dev
```

## Development

There is no root `package.json`: each package manages its own dependencies and commands. To develop a library, enter its directory:

```bash
cd packages/app-shell
npm install
npm run build
npm run dev
```

Replace `app-shell` with `form-editor`, `table-editor`, or `auth` as needed.

- `npm run build` creates the distribution in `dist/`.
- `npm run dev` starts the example located in `samples/`.
- `npm run preview` previews the built example.

## Create a project

Create a dashboard application with an ASP.NET Core Web API and framework-powered React frontend:

```bash
npx create-app my-app
```

The generated `my-app/` directory contains `my-app.csproj` and a `frontend/` Vite application. Use `--template blank` for a plain frontend or `--no-install` to defer its dependency installation. See [`packages/create-app/README.md`](packages/create-app/README.md) for all options.

## Structure

```text
packages/
  app-shell/      Layout, UI, hooks, and providers
  form-editor/    JSON form editor and viewer
  table-editor/   Data views for tables, lists, and cards
  auth/           Authentication, profiles, and access control
  create-app/      Full-stack project scaffolding CLI
```

## Licenses

The `@pmcfernandes/app-shell`, `@pmcfernandes/table-editor`, and `@pmcfernandes/auth` packages use the MIT license. See each package's `package.json` for its applicable license.
