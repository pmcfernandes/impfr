import { useState } from "react";
import { ChangePassword } from "../src/components/ChangePassword/index.js";
import { EditProfile } from "../src/components/EditProfile/index.js";
import { GroupsPermissions } from "../src/components/GroupsPermissions/index.js";
import { ForgotPassword } from "../src/components/ForgotPassword/index.js";
import { Login } from "../src/components/Login/index.js";
import { Register } from "../src/components/Register/index.js";

const USERS = [
  { id: 1, name: "Ana Silva", email: "ana.silva@example.com" },
  { id: 2, name: "Bruno Costa", email: "bruno.costa@example.com" },
  { id: 3, name: "Carla Santos", email: "carla.santos@example.com" },
];

const PERMISSIONS = [
  { key: "reports.view", label: "Ver denúncias" },
  { key: "reports.triage", label: "Fazer triagem" },
  { key: "reports.assign", label: "Atribuir denúncias" },
  { key: "statistics.view", label: "Ver estatísticas" },
  { key: "groups.manage", label: "Gerir grupos" },
  { key: "users.manage", label: "Gerir utilizadores" },
];

function groupFromPayload(id, payload) {
  return {
    id,
    name: payload.name,
    description: payload.description,
    permissions: payload.permissions,
    users: USERS.filter((user) => payload.userIds.includes(user.id)),
  };
}

export default function TestPage() {
  const [credentials, setCredentials] = useState(null);
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Administradores",
      description: "Acesso integral à gestão.",
      permissions: ["reports.view", "reports.triage", "reports.assign", "statistics.view", "groups.manage", "users.manage"],
      users: [USERS[0]],
    },
    {
      id: 2,
      name: "Triagem",
      description: "Avaliação inicial de denúncias.",
      permissions: ["reports.view", "reports.triage"],
      users: [USERS[1], USERS[2]],
    },
  ]);
  const [profile, setProfile] = useState({
    name: "Ana Silva",
    email: "ana.silva@example.com",
    phone: "+351 912 345 678",
    company: "Tremor Labs",
  });
  const [view, setView] = useState("login");

  return (
    <main className="grid min-h-screen place-items-center bg-gray-50 p-6 dark:bg-gray-950">
      <div className={`w-full space-y-4 ${view === "groups-permissions" ? "max-w-6xl" : "max-w-md"}`}>
        {view === "login" ? (
          <>
            <Login
              onSocialLogin={(provider) => setCredentials({ provider })}
              onSubmit={setCredentials}
              socialProviders={["google", "microsoft", "apple"]}
            />
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <button
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setView("forgot-password")}
                type="button"
              >
                Esqueceu-se da palavra-passe?
              </button>
              <button
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setView("register")}
                type="button"
              >
                Criar conta
              </button>
              <button
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setView("change-password")}
                type="button"
              >
                Alterar palavra-passe
              </button>
              <button
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setView("edit-profile")}
                type="button"
              >
                Editar perfil
              </button>
              <button
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setView("groups-permissions")}
                type="button"
              >
                Grupos e permissões
              </button>
            </div>
          </>
        ) : view === "register" ? (
          <Register onBack={() => setView("login")} onSubmit={setCredentials} />
        ) : view === "change-password" ? (
          <ChangePassword onBack={() => setView("login")} onSubmit={setCredentials} />
        ) : view === "edit-profile" ? (
          <EditProfile
            customFields={[
              { key: "phone", label: "Telefone", type: "tel", autoComplete: "tel" },
              { key: "company", label: "Empresa", autoComplete: "organization" },
            ]}
            initialValues={profile}
            onBack={() => setView("login")}
            onSubmit={(values) => {
              setProfile(values);
              setCredentials(values);
            }}
          />
        ) : view === "groups-permissions" ? (
          <GroupsPermissions
            groups={groups}
            onCreate={(payload) => {
              const group = groupFromPayload(Date.now(), payload);
              setGroups((items) => [...items, group]);
              setCredentials({ action: "create-group", ...payload });
            }}
            onUpdate={(id, payload) => {
              const group = groupFromPayload(id, payload);
              setGroups((items) => items.map((item) => (item.id === id ? group : item)));
              setCredentials({ action: "update-group", ...payload });
            }}
            permissions={PERMISSIONS}
            users={USERS}
          />
        ) : (
          <ForgotPassword onBack={() => setView("login")} onSubmit={setCredentials} />
        )}
        {credentials && (
          <pre className="overflow-auto rounded-lg border border-gray-800 bg-gray-950 p-4 text-xs text-gray-100 shadow-sm">
            {JSON.stringify(credentials, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
