import { useState } from "react";
import { AppShell, LanguageProvider, ThemeProvider, ThemeSwitch, useLanguage } from "@app-shell/react";
import { AuthProvider, Login, useAuth } from "@auth/react";
import Access from "./pages/Access.jsx";
import ApiData from "./pages/ApiData.jsx";
import Authentication from "./pages/Authentication.jsx";
import Components from "./pages/Components.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Forms from "./pages/Forms.jsx";
import Projects from "./pages/Projects.jsx";
import { initialProjects, permissions } from "./data.js";

const DEMO_USER_KEY = "react-framework-demo:user";

function readStoredUser() {
  try {
    const raw = window.localStorage.getItem(DEMO_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user, rememberMe) {
  try {
    if (rememberMe) window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(DEMO_USER_KEY);
  } catch {
    // storage unavailable: session stays in memory only
  }
}

const storedUser = readStoredUser();

function SignIn() {
  const { login } = useAuth();

  async function handleSubmit({ email, rememberMe }) {
    const user = { id: 1, name: "Demo user", email, permissions: permissions.map(({ key }) => key) };
    writeStoredUser(user, rememberMe);
    await login(user);
  }

  return (
    <main className="demo-login">
      <Login
        defaultRememberMe
        description="Use any valid email and password to open the demo."
        onSubmit={handleSubmit}
        socialProviders={["google", "microsoft"]}
        title="React Framework"
      />
    </main>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      className="inline-flex h-9 items-center rounded-md border border-gray-300 px-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-50"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      title={language === "pt" ? "Mudar para inglês" : "Switch to Portuguese"}
      type="button"
    >
      {language === "pt" ? "EN" : "PT"}
    </button>
  );
}

const PAGE_TITLES = {
  dashboard: "Dashboard",
  projects: "Projects",
  forms: "Forms",
  data: "API Data",
  components: "Components",
  access: "Access control",
  auth: "Authentication",
};

function Shell() {
  const { logout, user } = useAuth();
  const [page, setPage] = useState("dashboard");
  const [projects, setProjects] = useState(initialProjects);

  const navigation = [
    {
      id: "workspace",
      label: "Workspace",
      items: [
        { id: "dashboard", label: "Dashboard" },
        { id: "projects", label: "Projects" },
        { id: "forms", label: "Forms" },
        { id: "data", label: "API Data" },
      ],
    },
    {
      id: "showcase",
      label: "Showcase",
      items: [{ id: "components", label: "Components" }],
    },
    {
      id: "administration",
      label: "Administration",
      items: [
        { id: "access", label: "Access control" },
        { id: "auth", label: "Authentication" },
      ],
    },
  ];

  return (
    <AppShell
      activeNavigationId={page}
      breadcrumbs={[{ label: "React Framework" }, { label: PAGE_TITLES[page] }]}
      description="Package integration demo"
      headerActions={
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeSwitch />
        </div>
      }
      navigation={navigation}
      onLogout={logout}
      onNavigate={(item) => setPage(item.id)}
      title="React Framework"
      userEmail={user.email}
      userName={user.name}
    >
      {page === "dashboard" && <Dashboard projects={projects} onNavigate={setPage} />}
      {page === "projects" && <Projects projects={projects} onProjectsChange={setProjects} />}
      {page === "forms" && <Forms />}
      {page === "data" && <ApiData />}
      {page === "components" && <Components />}
      {page === "access" && <Access />}
      {page === "auth" && <Authentication />}
    </AppShell>
  );
}

function Application() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Shell /> : <SignIn />;
}

export default function App() {
  return (
    <ThemeProvider initialTheme="light">
      <LanguageProvider initialLanguage="en">
        <AuthProvider initialUser={storedUser} onLogout={() => writeStoredUser(null, false)}>
          <Application />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
