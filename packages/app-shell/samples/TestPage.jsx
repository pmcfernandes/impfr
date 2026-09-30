import { createRoot } from "react-dom/client";
import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { AppShell, LanguageProvider, ThemeProvider, ThemeSwitch, useStore } from "@pmcfernandes/app-shell";
import { AuthProvider, useAuth, useAuthenticated } from "@pmcfernandes/auth";
import "@pmcfernandes/app-shell/styles.css";
import { DashboardOverview } from "./components/DashboardOverview.jsx";
import { navigation } from "./components/navigation.jsx";
import { NotificationsButton } from "./components/NotificationsButton.jsx";
import { initialProjects } from "./components/projects.js";
import { ProjectsPage } from "./components/ProjectsPage.jsx";
import { SettingsPage } from "./components/SettingsPage.jsx";

function TestPage() {
  const { logout, user } = useAuth();
  const isAuthenticated = useAuthenticated();
  const [activePage, setActivePage] = useState("home");
  const [projects, setProjects] = useStore("app-shell:projects", initialProjects);

  function createProject(project) {
    setProjects((currentProjects) => [...currentProjects, { ...project, id: String(Date.now()) }]);
  }

  function updateProject(project) {
    setProjects((currentProjects) => currentProjects.map((currentProject) => currentProject.id === project.id ? project : currentProject));
  }

  function deleteProject(id) {
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
  }

  const breadcrumbs = {
    home: [{ label: "Área de trabalho" }, { label: "Início" }],
    projects: [{ label: "Área de trabalho" }, { label: "Projetos" }],
    settings: [{ label: "Conta" }, { label: "Definições" }],
  };

  return (
    <AppShell
      activeNavigationId={activePage}
      breadcrumbs={breadcrumbs[activePage]}
      description="Gestão de operações"
      headerActions={<div className="flex items-center gap-2"><ThemeSwitch /><NotificationsButton /></div>}
      navigation={navigation}
      onNavigate={(item) => setActivePage(item.id)}
      title="Backoffice"
      titleIcon={<LayoutDashboard size={16} strokeWidth={1.75} />}
      userName={isAuthenticated ? user?.name : undefined}
      userEmail={isAuthenticated ? user?.email : undefined}
      onLogout={logout}
    >
      {activePage === "home" && <DashboardOverview onCreateProject={() => setActivePage("projects")} onNavigate={setActivePage} projects={projects} />}
      {activePage === "projects" && <ProjectsPage onCreate={createProject} onDelete={deleteProject} onUpdate={updateProject} projects={projects} />}
      {activePage === "settings" && <SettingsPage />}
    </AppShell>
  );
}

createRoot(document.getElementById("root")).render(
  <ThemeProvider initialTheme="light">
    <AuthProvider initialUser={{ name: "Pedro Fernandes", email: "pedro.fernandes@example.com" }}>
      <LanguageProvider initialLanguage="pt">
        <TestPage />
      </LanguageProvider>
    </AuthProvider>
  </ThemeProvider>,
);
