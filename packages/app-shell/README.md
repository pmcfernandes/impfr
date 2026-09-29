# @app-shell/react

React library for building back-office applications and dashboards with `AppShell`, UI components, REST hooks, and internationalization. Requires React 18.2 or later.

## Installation

```bash
npm install @app-shell/react
```

Import the styles once in the application:

```jsx
import "@app-shell/react/styles.css";
```

## Quick start

```jsx
import { AppShell, LanguageProvider } from "@app-shell/react";
import "@app-shell/react/styles.css";

const navigation = [
  {
    id: "workspace",
    label: "Workspace",
    items: [{ id: "home", label: "Home" }],
  },
];

export function App() {
  return (
    <LanguageProvider initialLanguage="en">
      <AppShell
        breadcrumbs={[{ label: "Workspace" }, { label: "Home" }]}
        description="Operations management"
        navigation={navigation}
        title="Back Office"
        userEmail="user@example.com"
        userName="User name"
      >
        <h1>Page content</h1>
      </AppShell>
    </LanguageProvider>
  );
}
```

## Components

### AppShell

Main layout with a sidebar, header, breadcrumbs, and content that uses the available width and height.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Main content. |
| `config` | `object` | Alternative to individual props. Accepts `title`, `titleIcon`, `description`, `userName`, `userEmail`, `navigation`, and `activeNavigationId`. |
| `title` | `string` | Title shown at the top of the sidebar. Default: `Application`. |
| `titleIcon` | `ReactNode` | Icon before the sidebar title. |
| `description` | `string` | Text shown below the title. |
| `userName` | `string` | Session name at the bottom of the sidebar. |
| `userEmail` | `string` | Email used to generate the Gravatar avatar. |
| `navigation` | `NavigationItem[] \| NavigationSection[]` | Navigation items or sections. |
| `activeNavigationId` | `string` | Active item ID. |
| `breadcrumbs` | `BreadcrumbItem[]` | Items shown in the header. |
| `locale` | `"pt" \| "en"` | Language. Overrides `LanguageProvider`. |
| `headerActions` | `ReactNode` | Actions aligned to the right of the header. |
| `onNavigate` | `(item) => void` | Called when an item is selected. |
| `onLogout` | `() => void \| Promise<void>` | Called by the Sign out button. Can also be supplied in `config`. |

```jsx
const navigation = [
  {
    id: "workspace",
    label: "Workspace",
    items: [{ id: "home", label: "Home", icon: <Home /> }],
  },
  { id: "settings", label: "Settings", items: [{ id: "profile", label: "Profile" }] },
];
```

`NavigationItem`: `id`, `label`, `icon?`, `href?`.

`NavigationSection`: `id?`, `label?`, `items`.

### Sidebar

Standalone sidebar. Accepts all navigation items and session data directly.

| Prop | Type | Description |
| --- | --- | --- |
| `navigation` | `NavigationItem[] \| NavigationSection[]` | Flat navigation or sections. |
| `sections` | `NavigationSection[]` | Sections; takes precedence over `navigation`. |
| `title`, `titleIcon`, `description` | `string`, `ReactNode`, `string` | Header identity. |
| `activeNavigationId` | `string` | Active item. |
| `isOpen` | `boolean` | Visibility on mobile. Default: `false`. |
| `isCollapsed` | `boolean` | Collapsed mode. Default: `false`. |
| `locale` | `"pt" \| "en"` | Language. Default: `pt`. |
| `userName`, `userEmail` | `string` | Session and Gravatar. |
| `className` | `string` | Additional classes. |
| `onNavigate` | `(item) => void` | Item selection. |
| `onToggleCollapsed` | `() => void` | Toggles collapsed mode. |
| `onLogout` | `() => void` | Sign out action. |

### AlertBox

| Prop | Type | Description |
| --- | --- | --- |
| `icon` | `ReactNode` | Icon on the left. |
| `title` | `string` | Alert title. |
| `description` | `string` | Descriptive text. |
| `variant` | `info \| success \| warning \| danger` | Alert color. Default: `info`. |
| `children` | `ReactNode` | Additional content or actions. |
| `className` | `string` | Additional classes. |

### Accordion

| Prop | Type | Description |
| --- | --- | --- |
| `items` | `{ id: string, title: ReactNode, content: ReactNode, disabled?: boolean }[]` | Accordion sections. |
| `openItems` | `string[]` | Open IDs in controlled mode. |
| `defaultOpenItems` | `string[]` | Initially open IDs. Default: `[]`. |
| `onOpenChange` | `(ids: string[]) => void` | Called when open items change. |
| `multiple` | `boolean` | Allows multiple sections to be open. Default: `false`. |
| `className` | `string` | Additional classes. |

### Badge

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Content. |
| `variant` | `neutral \| success \| warning \| danger \| info` | Color. Default: `neutral`. |
| `className` | `string` | Additional classes. |

### BarChart

| Prop | Type | Description |
| --- | --- | --- |
| `data` | `{ name: string, value: number, color?: string }[]` | Chart bars. `color` accepts a Tailwind background class. |
| `orientation` | `vertical \| horizontal` | Bar orientation. Default: `vertical`. |
| `valueFormatter` | `(value: number) => ReactNode` | Value formatting. Default: numeric value. |
| `className` | `string` | Additional classes. |

### Breadcrumbs

| Prop | Type | Description |
| --- | --- | --- |
| `items` | `{ label: string, href?: string }[]` | Navigation path. The final item is the current page. |
| `className` | `string` | Additional classes. |

### Button

Accepts all native `button` props.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Content. |
| `variant` | `primary \| secondary \| danger` | Appearance. Default: `primary`. |
| `type` | `string` | HTML type. Default: `button`. |
| `className` | `string` | Additional classes. |

### Card

Accepts all native `section` props.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Content. |
| `className` | `string` | Additional classes. |

### ChartContainer

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Panel title. |
| `actions` | `ReactNode` | Actions in the right side of the header. |
| `children` | `ReactNode` | Chart or other content. |
| `className` | `string` | Additional classes. |

### DonutChart

| Prop | Type | Description |
| --- | --- | --- |
| `data` | `{ name: string, value: number, color?: string }[]` | Chart segments. |
| `label` | `string` | Caption below the central value. Default: `Total`. |
| `valueFormatter` | `(value: number) => ReactNode` | Formatting for the central total and accessible label. Default: numeric value. |
| `className` | `string` | Additional classes. |

### PanelContainer

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Optional title. |
| `description` | `string` | Optional description. |
| `actions` | `ReactNode` | Header actions. |
| `children` | `ReactNode` | Content. |
| `className` | `string` | Additional classes. |

### Kpi

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Metric name. |
| `value` | `ReactNode` | Main value. |
| `change` | `string` | Change displayed as a badge. |
| `changeType` | `positive \| negative \| neutral` | Change color. Default: `neutral`. |
| `description` | `string` | Additional context. |
| `className` | `string` | Additional classes. |

### LineChart

| Prop | Type | Description |
| --- | --- | --- |
| `data` | `{ name: string, value: number }[]` | Line points. |
| `color` | `string` | CSS or hexadecimal line color. Default: `#2563eb`. |
| `valueFormatter` | `(value: number) => ReactNode` | Tooltip formatting. Default: numeric value. |
| `className` | `string` | Additional classes. |

### SubHeader

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Page title. |
| `description` | `string` | Description below the title. |
| `actions` | `ReactNode` | Actions on the right. |
| `className` | `string` | Additional classes. |

### Tabs

| Prop | Type | Description |
| --- | --- | --- |
| `tabs` | `{ value: string, label: string }[]` | Available tabs. |
| `value` | `string` | Active tab. |
| `onValueChange` | `(value: string) => void` | Tab change handler. |
| `label` | `string` | Accessible label. Default: `Tab navigation`. |
| `className` | `string` | Additional classes. |

### ThemeSwitch

Toggles the `dark` class on `document.documentElement`.

| Prop | Type | Description |
| --- | --- | --- |
| `theme` | `light \| dark` | Controlled theme. |
| `defaultTheme` | `light \| dark` | Uncontrolled initial theme. Default: `light`. |
| `onThemeChange` | `(theme) => void` | Called when the theme is toggled. |

### Table

Composable primitives that accept the respective element's native props and `className`.

| Component | Element | Responsibility |
| --- | --- | --- |
| `TableRoot` | `div` | Horizontal scrolling. |
| `Table` | `table` | Base table. |
| `TableHead` | `thead` | Header. |
| `TableBody` | `tbody` | Body with row dividers. |
| `TableRow` | `tr` | Row. |
| `TableHeaderCell` | `th` | Header cell. |
| `TableCell` | `td` | Cell with vertical padding. |

```jsx
<TableRoot>
  <Table>
    <TableHead><TableRow><TableHeaderCell>Name</TableHeaderCell></TableRow></TableHead>
    <TableBody><TableRow><TableCell>Project A</TableCell></TableRow></TableBody>
  </Table>
</TableRoot>
```

### Dialog

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Visible state. |
| `onOpenChange` | `(open: boolean) => void` | Called when closed. |
| `title` | `string` | Optional title. |
| `description` | `string` | Optional description. |
| `actions` | `ReactNode` | Footer actions. |
| `children` | `ReactNode` | Content. |
| `className` | `string` | Additional panel classes. |

### Drawer

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Visible state. |
| `onOpenChange` | `(open: boolean) => void` | Called when closed. |
| `title` | `string` | Optional title. |
| `description` | `string` | Optional description. |
| `actions` | `ReactNode` | Footer actions. |
| `children` | `ReactNode` | Content. |
| `side` | `left \| right` | Panel side. Default: `right`. |
| `className` | `string` | Additional panel classes. |

### ConfirmDialog

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Visible state. |
| `onOpenChange` | `(open: boolean) => void` | Visibility change handler. |
| `onConfirm` | `() => void` | Confirmation action. |
| `title` | `string` | Default: `Confirm action`. |
| `description` | `string` | Optional description. |
| `confirmLabel` | `string` | Default: `Confirm`. |
| `cancelLabel` | `string` | Default: `Cancel`. |
| `children` | `ReactNode` | Additional content. |

### Wizard

| Prop | Type | Description |
| --- | --- | --- |
| `steps` | `{ id?, title, description?, content }[]` | Workflow steps. Required. |
| `activeStep` | `number` | Controlled step. |
| `defaultStep` | `number` | Uncontrolled initial step. Default: `0`. |
| `onStepChange` | `(index: number) => void` | Step change handler. |
| `onComplete` | `() => void` | Final-step action. |
| `locale` | `pt \| en` | Button language. Default: `pt`. |
| `className` | `string` | Additional classes. |

## REST Hooks

All hooks use `fetch`. Read hooks return `data`, `error`, `isLoading`, and `refetch`. Mutation hooks return `data`, `error`, and `isLoading`.

### fetchJson

```js
const data = await fetchJson("/api/projects", { headers: { Authorization: "Bearer token" } });
```

`fetchJson(url, options?)` returns JSON, throws an error when the response is unsuccessful, and returns `null` for `204` responses.

### useGetList

```js
const { data, error, isLoading, refetch } = useGetList("/api/projects", {
  enabled: true,
  fetchOptions: { headers: { Authorization: "Bearer token" } },
});
```

Options: `enabled` (defaults to `true`) and `fetchOptions` (native `fetch` options).

### useGetOne

```js
const project = useGetOne("/api/projects", projectId, options);
```

Signature: `useGetOne(url, id, options?)`. Uses `GET {url}/{id}`. Options are the same as `useGetList`.

### useGetMany

```js
const projects = useGetMany("/api/projects", [1, 2], { idsParam: "ids" });
```

Signature: `useGetMany(url, ids, options?)`. Uses `GET {url}?{idsParam}=1,2`.

Options: `idsParam` (default: `ids`), `enabled`, `fetchOptions`.

### useInfiniteGetList

```js
const {
  data,
  pages,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isLoadingMore,
  error,
  refetch,
} = useInfiniteGetList("/api/projects", {
  pageParam: "page",
  pageSize: 20,
  pageSizeParam: "pageSize",
});
```

Options: `enabled` (default: `true`), `fetchOptions`, `initialPage` (default: `1`), `pageParam` (default: `page`), `pageSize`, `pageSizeParam` (default: `pageSize`), and `getItems(response)` (default: response array or `response.data`).

### useStore

```js
const [workspaceName, setWorkspaceName, removeWorkspaceName] = useStore(
  "app-shell:workspace-name",
  "Back Office",
);
```

Signature: `useStore(key, initialValue)`. Persists JSON values in `localStorage` and returns a tuple:

| Position | Type | Description |
| --- | --- | --- |
| `0` | `value` | Current value. |
| `1` | `setValue(value \| updater)` | Updates the state and persisted value. Accepts a function with the previous value. |
| `2` | `remove()` | Removes the key and restores `initialValue` in memory. |

The hook is SSR-safe, ignores `localStorage` failures, and responds to changes to the same key in other tabs.

### useCreate

```js
const { create, data, error, isLoading } = useCreate("/api/projects", fetchOptions);
await create({ name: "New project" });
```

Signature: `useCreate(url, fetchOptions?)`. Executes `POST {url}` with the JSON payload.

### useUpdate

```js
const { update } = useUpdate("/api/projects", fetchOptions);
await update(projectId, { name: "Updated name" });
```

Signature: `useUpdate(url, fetchOptions?)`. Executes `PATCH {url}/{id}` with the JSON payload.

### useDelete

```js
const { remove } = useDelete("/api/projects", fetchOptions);
await remove(projectId);
```

Signature: `useDelete(url, fetchOptions?)`. Executes `DELETE {url}/{id}`.

### useDeleteMany

```js
const { removeMany } = useDeleteMany("/api/projects", fetchOptions);
await removeMany([1, 2, 3]);
```

Signature: `useDeleteMany(url, fetchOptions?)`. Executes `DELETE {url}` with `{ ids: [...] }` as JSON.

## Providers

### LanguageProvider

```jsx
import { LanguageProvider, useLanguage } from "@app-shell/react";

function LanguageButton() {
  const { language, setLanguage, t } = useLanguage();
  return <button onClick={() => setLanguage(language === "pt" ? "en" : "pt")}>{t("menu")}</button>;
}

export function App() {
  return <LanguageProvider initialLanguage="en"><LanguageButton /></LanguageProvider>;
}
```

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Tree provided by the context. |
| `initialLanguage` | `pt \| en` | Initial language. Default: `pt`. |

`useLanguage()` returns `language`, `setLanguage(language)`, and `t(key)`.

### ThemeProvider

```jsx
import { ThemeProvider, ThemeSwitch, useTheme } from "@app-shell/react";

function ThemeLabel() {
  const { theme } = useTheme();
  return <p>Current theme: {theme}</p>;
}

export function App() {
  return <ThemeProvider initialTheme="light"><ThemeSwitch /><ThemeLabel /></ThemeProvider>;
}
```

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Tree provided by the context. |
| `initialTheme` | `light \| dark` | Initial theme. Default: `light`. |

`useTheme()` returns `theme` and `setTheme(theme)`. The provider updates the `dark` class on `document.documentElement`.

## Utilities

`createTranslator(locale?)` creates a `t(key)` function for the `pt` and `en` languages.

`normalizeAppShellConfig(config?)` normalizes `title`, `navigation`, and `activeNavigationId` for `AppShell`.

## Development

```bash
npm install
npm run build
npm run dev
```

The example is in `samples/`.
