# React Framework

A collection of reusable React libraries for building management interfaces, authentication, configurable forms, and data views. Each package is independent, includes a Vite example in `samples/`, and can be published and consumed separately.

## Packages

| Package | Description | Documentation |
| --- | --- | --- |
| `@app-shell/react` | Structure for back-office applications and dashboards, with a sidebar, header, UI components, REST hooks, themes, and internationalization. | [`packages/app-shell/README.md`](packages/app-shell/README.md) |
| `@form-editor/react` | JSON configuration-driven form editor and viewer. | [`packages/form-editor/README.md`](packages/form-editor/README.md) |
| `@table-editor/react` | JSON data viewing and editing in tables, lists, or cards. | [`packages/table-editor/README.md`](packages/table-editor/README.md) |
| `@login/react` | Components and context for authentication, profiles, groups, and permissions. | [`packages/login/README.md`](packages/login/README.md) |

## Requirements

- A current Node.js version with npm
- React and React DOM 18 or later in the consuming application

## Installation

Install only the packages required by your React application:

```bash
npm install @app-shell/react @form-editor/react @table-editor/react @login/react
```

Import each used library's stylesheet once:

```jsx
import "@app-shell/react/styles.css";
import "@form-editor/react/styles.css";
import "@table-editor/react/styles.css";
import "@login/react/styles.css";
```

## Quick Start

```jsx
import { AppShell } from "@app-shell/react";
import { Login } from "@login/react";
import { FormViewer } from "@form-editor/react";
import { DataView } from "@table-editor/react";

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
- Project data in table, list, and card views via `@table-editor/react`.
- Simple and multi-step (wizard) forms with conditional fields, file upload, consent, and API-powered selects via `@form-editor/react`, plus the JSON form editor.
- A `/api/*` in-browser mock (latency + `localStorage` persistence) driving every REST hook: `useGetList`, `useGetOne`, `useGetMany`, `useInfiniteGetList`, `useCreate`, `useUpdate`, `useDelete`, `useDeleteMany`, `useStore`, and `fetchJson`.
- A gallery of `@app-shell/react` primitives: alerts, accordion, tabs, buttons, badges, dialogs, drawers, confirm dialogs, wizards, and tables.
- Every `@login/react` screen: sign in with Remember me (persisted session), register, forgot password, change password, edit profile, groups and permissions, and `CanAccess` permission gates.

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

Replace `app-shell` with `form-editor`, `table-editor`, or `login` as needed.

- `npm run build` creates the distribution in `dist/`.
- `npm run dev` starts the example located in `samples/`.
- `npm run preview` previews the built example.

## Structure

```text
packages/
  app-shell/      Layout, UI, hooks, and providers
  form-editor/    JSON form editor and viewer
  table-editor/   Data views for tables, lists, and cards
  login/          Authentication, profiles, and access control
```

## Licenses

The `@app-shell/react`, `@table-editor/react`, and `@login/react` packages use the MIT license. See each package's `package.json` for its applicable license.
