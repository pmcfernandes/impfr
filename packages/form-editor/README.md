# @pmcfernandes/form-editor

JSON form editor and viewer for React. Standalone components that receive a JSON configuration and return the result via callbacks.

**Live demo:** https://forms-editor-o73w.vercel.app/

## Installation

```bash
npm install @pmcfernandes/form-editor
```

The consumer must have `react` and `react-dom` (>=18) installed.

## Styles

The library uses Tailwind CSS v4. Import the CSS:

```js
import '@pmcfernandes/form-editor/styles.css'
```

Or, if you already use Tailwind in your project, just make sure the `content` option in `tailwind.config` includes `node_modules/@pmcfernandes/form-editor/dist/**/*.{js,cjs}`.

## Usage

### FormEditor — edit form definitions

```jsx
import { FormEditor } from '@pmcfernandes/form-editor'
import '@pmcfernandes/form-editor/styles.css'

function MyEditor() {
  const formJson = {
    name: 'Contact form',
    description: '',
    visible: true,
    fields: [],
  }

  return (
    <FormEditor
      json={formJson}
      onSave={(json) => {
        // json = updated form configuration
        console.log('Saved:', json)
        // persist to backend...
      }}
      onCancel={() => history.back()}
    />
  )
}
```

#### FormEditor props

| Prop | Type | Description |
|---|---|---|
| `json` | `object` | Form configuration JSON |
| `onSave` | `(json) => Promise\|void` | Called on save. Receives the updated JSON |
| `onCancel` | `() => void` | Called on cancel/back |
| `onUploadFiles` | `({field, files}) => Promise<{files}>` | Attachment upload (optional) |
| `onDeleteFile` | `({field, name}) => Promise<void>` | Remove file (optional) |
| `getFileUrl` | `({field, name}) => string` | URL to open file (optional) |
| `onFetchSource` | `({url, headers}) => Promise<payload>` | Fetch API options (optional) |
| `HtmlEditor` | `Component` | Custom HTML editor (replaces TinyMCE) |
| `tinymceBaseUrl` | `string` | TinyMCE base URL (self-hosted) |

### FormViewer — fill out / submit forms

```jsx
import { FormViewer } from '@pmcfernandes/form-editor'
import '@pmcfernandes/form-editor/styles.css'

function MyViewer() {
  return (
    <FormViewer
      json={formJson}
      onSubmit={(data, { consent }) => {
        // data = { field_name: value, ... }
        console.log('Submitted:', data, consent)
      }}
    />
  )
}
```

### FormViewer — edit mode

```jsx
<FormViewer
  json={formJson}
  defaultValues={existingData}
  onSave={(data) => {
    // data = updated JSON with the filled answers
    console.log('Saved:', data)
  }}
/>
```

#### FormViewer props

| Prop | Type | Description |
|---|---|---|
| `json` | `object` | Form configuration JSON |
| `defaultValues` | `object` | Initial values (enables edit mode) |
| `onSubmit` | `(data, {consent}) => Promise\|void` | New data submission |
| `onSave` | `(data, {consent}) => Promise\|void` | Save changes (edit mode) |
| `onCancel` | `() => void` | Cancel button |
| `submitLabel` | `string` | Button text (auto: "Submit"/"Save") |
| `readOnly` | `boolean` | Disables consent |
| `allSteps` | `boolean` | Shows all steps at once |
| `onUploadFiles` | `({field, files}) => Promise<{files}>` | Attachment upload |
| `onDeleteFile` | `({field, name}) => Promise<void>` | Remove file |
| `getFileUrl` | `({field, name}) => string` | URL to open file |

## JSON format

```jsonc
{
  "name": "Form name",
  "description": "Optional description",
  "visible": true,
  "available_from": "2025-01-01 00:00",  // optional
  "available_to": "2025-12-31 23:59",    // optional
  "consent_required": false,
  "consent_text": "I declare that I have read and accept...",
  "privacy_url": "https://...",
  "remote_url": "",        // optional webhook
  "notify_email": "",      // notifications
  "notify_field": "",      // user email field
  "fields": [
    {
      "id": "f1a2b3c4d5e6",
      "type": "text",       // text|textarea|number|email|password|date|select|radio|checkbox|checkboxgroup|file|heading|html|steps
      "label": "Name",
      "name": "name",       // unique, [A-Za-z_][A-Za-z0-9_]*
      "helpText": "",
      "placeholder": "Enter the name",
      "required": true,
      "requiredCondition": { "enabled": false, "logic": "any", "rules": [] },
      "condition": { "enabled": false, "logic": "any", "rules": [] },
      "defaultValue": "",
      "columns": 12,
      "pattern": "",
      "patternMessage": "",
      "readOnly": false,
      "visible": true,
      "parentId": null
    }
  ]
}
```

### Data field types

`text`, `textarea`, `number`, `email`, `password`, `date`, `select`, `radio`, `checkbox`, `checkboxgroup`, `file`

### Containers

- `heading` — Section (accepts child fields via `parentId`)
- `steps` — Steps/Wizard (accepts `heading` as children)
- `html` — Free HTML text block

### Types with options

`select`, `radio`, `checkboxgroup` accept `options: [{label, value}]` and optionally `apiSource: {url, headers, path, labelKey, valueKey}`.

## Exported utilities

```js
import {
  createField, validateValues, toPayload, evalCondition,
  isFieldVisible, isRequired, initialValues,
  FIELD_TYPES, OPERATORS, DATA_TYPES,
} from '@pmcfernandes/form-editor'
```

## Build

```bash
cd packages/form-editor
npm install
npm run build
```

Output in `dist/`:
- `form-editor.js` (ESM)
- `form-editor.cjs` (CommonJS)
- `form-editor.css` (Tailwind + DayPicker)
