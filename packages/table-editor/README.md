# @table-editor/react

Reusable React component for viewing and editing JSON data as tables, lists, or cards.

**Live demo:** https://table-editor-objg.vercel.app/

## Installation

```bash
npm install @table-editor/react
```

The host application must provide `react` and `react-dom` version 18 or later.

## Styles

The library uses Tailwind CSS v4. Import the generated stylesheet once:

```js
import "@table-editor/react/styles.css";
```

If your application already compiles Tailwind, include `node_modules/@table-editor/react/dist/**/*.{js,cjs}` in its content/source configuration instead.

## Usage

```jsx
import { DataView } from "@table-editor/react";
import "@table-editor/react/styles.css";

const config = {
  title: "Products",
  idKey: "id",
  data: [{ id: 1, name: "Keyboard", price: 89.9, status: "Active" }],
  columns: [
    { key: "name", label: "Product" },
    { key: "price", label: "Price", type: "currency", currency: "EUR" },
    { key: "status", label: "Status", type: "badge", badgeMap: { Active: "success" } },
  ],
};

export function Products() {
  return <DataView config={config} locale="en" onChange={(rows) => console.log(rows)} />;
}
```

## Configuration

| Property | Type | Description |
| --- | --- | --- |
| `data` | `object[]` | Data to display. Required. |
| `columns` | `object[]` | Column definitions. Inferred from the first row when omitted. |
| `viewModes` | `string[]` | Available views: `table`, `list`, `cards`. |
| `defaultView` | `string` | Initial view. |
| `fieldSearch` | `true \| string[]` | Per-column table search inputs. |
| `groupBy` | `string` | Field used to group table rows. |
| `multiDelete` | `boolean` | Enables row selection and bulk deletion. |
| `columnVisibility` | `boolean` | Shows the column visibility popup. |
| `hiddenColumns` | `string[]` | Initially hidden columns. |

### Description row

Set `description: true` on one column to render its value in a full-width row below its record in the table view:

```js
{ key: "description", label: "Description", type: "text", description: true }
```

### Nested grids

Set `subGrid` on a column whose value is an array. The nested grid is rendered under the parent record and is collapsed by default:

```js
{
  key: "variants",
  label: "Variants",
  subGrid: {
    title: "Variants",
    collapsible: true,
    idKey: "id",
    columns: [
      { key: "sku", label: "SKU" },
      { key: "stock", label: "Stock", type: "number" },
    ],
  },
}
```

## Props

| Prop | Description |
| --- | --- |
| `config` | Configuration object containing `data`. |
| `locale` | `pt` or `en`. |
| `onChange(rows)` | Called after records are created, edited, or deleted. |
| `viewModes` | Overrides `config.viewModes`. |
| `showExport` | Overrides `config.exportable`. |
| `fieldSearch` | Overrides `config.fieldSearch`. |
| `actions` | Additional toolbar buttons. |
| `onDeleteSelected` | Bulk-delete callback. Return `false` to prevent the local deletion. |

## Development

```bash
npm run build
cd samples && npm run dev
```

## Publishing

```bash
npm login
npm publish --access public
```
