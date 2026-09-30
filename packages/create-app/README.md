# create-react-framework

Create a Vite React project preconfigured for this framework's packages.

```bash
npx create-react-framework my-app
```

The default `dashboard` template includes `@pmcfernandes/app-shell`, `@pmcfernandes/form-editor`, and `@pmcfernandes/table-editor`. The `blank` template creates a plain Vite React application instead.

```bash
npx create-react-framework my-app --template blank
npx create-react-framework my-app --no-install
```

## Options

- `-t, --template <dashboard|blank>` selects a template. Default: `dashboard`.
- `--no-install` skips `npm install`.
- `-f, --force` allows writing into an existing directory. Existing files with matching names are replaced; files are never deleted.
- `-h, --help` prints usage.

After creation, run `cd my-app` followed by `npm run dev`.
