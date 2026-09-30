# @pmcfernandes/auth

React components for authentication, profiles, group management, and permissions.

## Installation

```bash
npm install @pmcfernandes/auth
```

Import the styles once in your application:

```jsx
import "@pmcfernandes/auth/styles.css";
```

## Provider

### `AuthProvider`

Provides authentication state to `useAuth`, `useAuthenticated`, `useCanAccess`, and `CanAccess`.

```jsx
import { AuthProvider } from "@pmcfernandes/auth";

<AuthProvider
  initialUser={{ id: 1, name: "Ana Silva", permissions: ["users.role.edit"] }}
  onLogin={async (credentials) => authenticate(credentials)}
  onLogout={async (user) => endSession(user)}
>
  <App />
</AuthProvider>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Content with access to the authentication context. |
| `initialUser` | `object \| null` | `null` | Initial user. For access control, use `permissions: string[]`. |
| `onLogin` | `(credentials) => user \| Promise<user>` | - | Receives credentials, returns the user, and updates the context. Without this callback, credentials become the user. |
| `onLogout` | `(user) => void \| Promise<void>` | - | Receives the current user before the context is cleared. |

## Hooks

### `useAuth()`

Returns the `AuthProvider` context. Throws an error when used outside the provider.

```jsx
const { isAuthenticated, login, logout, setUser, user } = useAuth();
```

| Value | Type | Description |
| --- | --- | --- |
| `user` | `object \| null` | Current user. |
| `isAuthenticated` | `boolean` | `true` when a user exists. |
| `login` | `(credentials) => Promise<user>` | Calls `onLogin` when provided, stores, and returns the user. |
| `logout` | `() => Promise<void>` | Calls `onLogout` when provided and removes the user. |
| `setUser` | `Dispatch<SetStateAction<user \| null>>` | Directly updates the user in the context. |

### `useAuthenticated()`

Returns `true` when an authenticated user exists.

```jsx
const isAuthenticated = useAuthenticated();
```

### `useCanAccess(action, resource)`

Returns `true` when `user.permissions` contains the `${resource}.${action}` permission. Requires `AuthProvider`.

```jsx
const canEditRole = useCanAccess("edit", "users.role");
```

| Parameter | Type | Description |
| --- | --- | --- |
| `action` | `string` | Permission action, such as `add`, `edit`, `delete`, or `delete_any`. |
| `resource` | `string` | Resource/permission name, such as `users.role`. |

## Components

### `Login`

Email and password sign-in form.

```jsx
<Login
  onSubmit={({ email, password, rememberMe }) => authenticate({ email, password, rememberMe })}
  socialProviders={["google", "microsoft"]}
  onSocialLogin={(provider) => beginOAuth(provider)}
/>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `"pt" \| "en"` | `"pt"` | Text language. Other values use Portuguese. |
| `title` | `string` | translated text | Form title. |
| `description` | `string` | translated text | Form description. |
| `onSubmit` | `({ email, password, rememberMe }) => void \| Promise<void>` | - | Receives submitted credentials and the "Remember me" choice. |
| `onSocialLogin` | `(provider) => void \| Promise<void>` | - | Receives `google`, `microsoft`, or `apple`. |
| `socialProviders` | `string[]` | `[]` | Displayed providers: `google`, `microsoft`, and `apple`. Unknown values are ignored. |
| `submitting` | `boolean` | `false` | Disables buttons while authenticating. |
| `showRememberMe` | `boolean` | `true` | Displays the "Remember me" checkbox. |
| `rememberMe` | `boolean` | - | Controlled checkbox value. |
| `defaultRememberMe` | `boolean` | `false` | Initial checkbox value in uncontrolled mode. |
| `onRememberMeChange` | `(value) => void` | - | Called when the "Remember me" checkbox changes. |
| `className` | `string` | `""` | Additional container classes. |

### `ForgotPassword`

Password recovery request form.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `"pt" \| "en"` | `"pt"` | Text language. |
| `title` | `string` | translated text | Form title. |
| `description` | `string` | translated text | Form description. |
| `onSubmit` | `({ email }) => void \| Promise<void>` | - | Receives the submitted email. |
| `onBack` | `() => void` | - | Displays and handles the action to return to sign-in. |
| `submitting` | `boolean` | `false` | Disables the submit button. |
| `className` | `string` | `""` | Additional container classes. |

### `Register`

Account registration form. Submission only occurs when the confirmation matches the password.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `"pt" \| "en"` | `"pt"` | Text language. |
| `title` | `string` | translated text | Form title. |
| `description` | `string` | translated text | Form description. |
| `onSubmit` | `({ name, email, password }) => void \| Promise<void>` | - | Receives registration data. |
| `onBack` | `() => void` | - | Displays and handles the return action. |
| `submitting` | `boolean` | `false` | Disables the submit button. |
| `className` | `string` | `""` | Additional container classes. |

### `ChangePassword`

Password change form. Submission only occurs when the new password and confirmation match.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `"pt" \| "en"` | `"pt"` | Text language. |
| `title` | `string` | translated text | Form title. |
| `description` | `string` | translated text | Form description. |
| `onSubmit` | `({ currentPassword, password }) => void \| Promise<void>` | - | Receives the current and new passwords. |
| `submitting` | `boolean` | `false` | Disables the submit button. |
| `className` | `string` | `""` | Additional container classes. |

### `EditProfile`

Profile editing form with a Gravatar avatar based on the email address.

```jsx
<EditProfile
  initialValues={{ name: "Ana Silva", email: "ana@example.com", phone: "+351 912 345 678" }}
  customFields={[{ key: "phone", label: "Phone", type: "tel", required: true }]}
  onSubmit={(profile) => updateProfile(profile)}
/>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialValues` | `object` | `{}` | Initial values for `name`, `email`, and custom fields. |
| `customFields` | `Array<{ key, label?, type?, ...inputProps }>` | `[]` | Extra fields. `key` is required; remaining props are applied to the `input`. `type` defaults to `"text"`. |
| `locale` | `"pt" \| "en"` | `"pt"` | Text language. |
| `title` | `string` | translated text | Form title. |
| `description` | `string` | translated text | Form description. |
| `onSubmit` | `({ name, email, ...customValues }) => void \| Promise<void>` | - | Receives the submitted profile. |
| `onBack` | `() => void` | - | Displays and handles the return action. |
| `submitting` | `boolean` | `false` | Disables the submit button. |
| `className` | `string` | `""` | Additional container classes. |

### `GroupsPermissions`

Interface for creating and editing groups, users, and permissions.

```jsx
<GroupsPermissions
  groups={groups}
  users={users}
  permissions={permissions}
  onCreate={(payload) => createGroup(payload)}
  onUpdate={(groupId, payload) => updateGroup(groupId, payload)}
/>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `groups` | `Group[]` | `[]` | Displayed and editable groups. |
| `users` | `User[]` | `[]` | Users available for each group. |
| `permissions` | `Permission[]` | `[]` | Permissions available for each group. |
| `initialSelectedGroupId` | `string \| number \| null` | `null` | Initial group in uncontrolled mode. |
| `selectedGroupId` | `string \| number \| null` | - | Selected group in controlled mode. |
| `onSelectedGroupChange` | `(groupId \| null) => void` | - | Notifies selection changes; receives `null` to create a group. |
| `onCreate` | `(payload) => void \| Promise<void>` | - | Receives a new group's data and clears the form when completed. |
| `onUpdate` | `(groupId, payload) => void \| Promise<void>` | - | Receives the ID and data of the edited group. |
| `isSaving` | `boolean` | `false` | Disables form submission. |
| `errors` | `object` | `{}` | Messages for `name`, `description`, `permissions`, and `userIds`. |
| `locale` | `"pt" \| "en"` | `"pt"` | Text language. |
| `accentColor` | `string` | `"#155DFC"` | Control and selection color. |
| `className` | `string` | `""` | Additional container classes. |

```jsx
const permissions = [{ key: "users.role.edit", label: "Edit roles" }];
const users = [{ id: 1, name: "Ana Silva", email: "ana@example.com" }];
const groups = [{
  id: 1,
  name: "Administrators",
  description: "Full access",
  permissions: ["users.role.edit"],
  users,
}];
```

`Group` uses `{ id, name, description?, permissions?: string[], users?: User[] }`; `User` uses `{ id, name, email }`; `Permission` uses `{ key, label }`. The `onCreate` and `onUpdate` callbacks receive `{ name, description, permissions, userIds }`.

### `CanAccess`

Renders children only when the authenticated user has the `${resource}.${action}` permission. Requires `AuthProvider`.

```jsx
<CanAccess action="edit" resource="users.role">
  <button type="button">Edit role</button>
</CanAccess>
```

| Prop | Type | Description |
| --- | --- | --- |
| `action` | `string` | Action, such as `add`, `edit`, `delete`, or `delete_any`. |
| `resource` | `string` | Resource/permission name, such as `users.role`. |
| `children` | `ReactNode` | Content displayed when access is granted. |

## Utilities

### `createTranslator(locale)`

Creates a translation function for internal component keys.

```jsx
const t = createTranslator("en");
const title = t("loginTitle");
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `"pt" \| "en"` | `"pt"` | Language. Unsupported values use Portuguese. |

The returned function receives a key and returns the translated text. For a missing key, it returns the key itself.

## Exports

```jsx
import {
  AuthProvider,
  CanAccess,
  ChangePassword,
  EditProfile,
  ForgotPassword,
  GroupsPermissions,
  Login,
  Register,
  createTranslator,
  useAuth,
  useAuthenticated,
  useCanAccess,
} from "@pmcfernandes/auth";
```
