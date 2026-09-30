import { useState } from "react";
import { Button, Card, Tabs } from "@app-shell/react";
import {
  CanAccess,
  ChangePassword,
  EditProfile,
  ForgotPassword,
  Register,
  useAuth,
  useAuthenticated,
  useCanAccess,
} from "@login/react";
import { permissions } from "../data.js";
import ResultJson from "./ResultJson.jsx";

const AUTH_TABS = [
  { value: "register", label: "Register" },
  { value: "forgot", label: "Forgot password" },
  { value: "password", label: "Change password" },
  { value: "profile", label: "Edit profile" },
  { value: "permissions", label: "Permissions" },
];

export default function Authentication() {
  const [tab, setTab] = useState("register");
  const [result, setResult] = useState(null);
  const { user, setUser } = useAuth();
  const isAuthenticated = useAuthenticated();
  const canEditProjects = useCanAccess("edit", "projects");
  const canManageForms = useCanAccess("manage", "forms");

  function togglePermission(key) {
    setUser((current) => {
      if (!current) return current;
      const currentPermissions = current.permissions || [];
      return {
        ...current,
        permissions: currentPermissions.includes(key)
          ? currentPermissions.filter((permission) => permission !== key)
          : [...currentPermissions, key],
      };
    });
  }

  return (
    <section className="space-y-6">
      <Card className="p-5">
        <h1 className="text-xl font-semibold">Authentication</h1>
        <p className="mt-1 text-sm text-gray-500">
          Every auth screen from `@login/react`. Submissions are shown below instead of reaching a backend.
        </p>
        <div className="mt-4">
          <Tabs tabs={AUTH_TABS} value={tab} onValueChange={setTab} label="Authentication screens" />
        </div>
      </Card>

      {tab === "register" && (
        <div className="mx-auto w-full max-w-md">
          <Register onSubmit={(data) => setResult({ form: "register", data })} />
        </div>
      )}

      {tab === "forgot" && (
        <div className="mx-auto w-full max-w-md">
          <ForgotPassword onBack={() => setTab("register")} onSubmit={(data) => setResult({ form: "forgot-password", data })} />
        </div>
      )}

      {tab === "password" && (
        <div className="mx-auto w-full max-w-md">
          <ChangePassword onSubmit={(data) => setResult({ form: "change-password", data })} />
        </div>
      )}

      {tab === "profile" && (
        <div className="mx-auto w-full max-w-md">
          <EditProfile
            customFields={[{ key: "phone", label: "Phone", type: "tel", autoComplete: "tel" }]}
            initialValues={{ name: user?.name ?? "", email: user?.email ?? "", phone: "" }}
            onSubmit={(profile) => {
              setUser((current) => ({ ...current, ...profile }));
              setResult({ form: "edit-profile", data: profile });
            }}
          />
        </div>
      )}

      {tab === "permissions" && (
        <Card className="space-y-4 p-5">
          <div>
            <h2 className="text-base font-semibold">Current session</h2>
            <p className="mt-1 text-sm text-gray-500">
              Authenticated: <strong>{String(isAuthenticated)}</strong> · User: <strong>{user?.name}</strong> ({user?.email})
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Toggle permissions</h3>
            <div className="mt-2 flex flex-wrap gap-4">
              {permissions.map(({ key, label }) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    checked={(user?.permissions || []).includes(key)}
                    className="h-4 w-4 rounded border-gray-300 accent-blue-600 dark:border-gray-700"
                    onChange={() => togglePermission(key)}
                    type="checkbox"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Gated content</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              CanAccess renders its children only when the user holds the permission; the hook results update live.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <CanAccess action="edit" resource="projects">
                <Button>Edit project</Button>
              </CanAccess>
              <CanAccess action="manage" resource="forms">
                <Button variant="secondary">Manage forms</Button>
              </CanAccess>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
              <li>useCanAccess(&quot;edit&quot;, &quot;projects&quot;) → {String(canEditProjects)}</li>
              <li>useCanAccess(&quot;manage&quot;, &quot;forms&quot;) → {String(canManageForms)}</li>
            </ul>
          </div>
        </Card>
      )}

      {tab !== "permissions" && <ResultJson title="Last auth output" data={result} />}
    </section>
  );
}
