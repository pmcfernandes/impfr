import { useState } from "react";
import { Badge, Button, ConfirmDialog, Drawer, PanelContainer, SubHeader, Tabs } from "@pmcfernandes/app-shell";

const tabs = [
  { label: "Todos", value: "all" },
  { label: "Em curso", value: "active" },
  { label: "Concluídos", value: "completed" },
];

const statusVariants = { "Em curso": "info", Planeamento: "warning", Concluído: "success" };

const emptyProject = { name: "", owner: "", status: "Planeamento", progress: 0 };

export function ProjectsPage({ projects, onCreate, onDelete, onUpdate }) {
  const [filter, setFilter] = useState("all");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [draft, setDraft] = useState(emptyProject);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const visibleProjects = projects.filter((project) => {
    if (filter === "active") return project.status !== "Concluído";
    if (filter === "completed") return project.status === "Concluído";
    return true;
  });

  function openEditor(project) {
    setEditingProject(project ?? null);
    setDraft(project ?? emptyProject);
    setIsEditorOpen(true);
  }

  function saveProject() {
    const project = { ...draft, name: draft.name.trim() || "Projeto sem nome", owner: draft.owner.trim() || "Sem responsável" };
    if (editingProject) onUpdate({ ...project, id: editingProject.id });
    else onCreate(project);
    setIsEditorOpen(false);
  }

  return (
    <div className="w-full">
      <SubHeader
        actions={<Button onClick={() => openEditor()}>Novo projeto</Button>}
        className="mb-6"
        description="Crie, acompanhe e atualize os projetos da equipa."
        title="Projetos"
      />
      <PanelContainer title="Todos os projetos">
        <Tabs className="mb-5" onValueChange={setFilter} tabs={tabs} value={filter} />
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {visibleProjects.map((project) => (
            <div className="flex flex-col gap-4 py-4 first:pt-0 sm:flex-row sm:items-center" key={project.id}>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-950 dark:text-gray-50">{project.name}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Responsável: {project.owner}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariants[project.status]}>{project.status}</Badge>
                <span className="w-10 text-right text-sm text-gray-500 dark:text-gray-400">{project.progress}%</span>
                <Button onClick={() => openEditor(project)} variant="secondary">Editar</Button>
                <Button onClick={() => setProjectToDelete(project)} variant="danger">Eliminar</Button>
              </div>
            </div>
          ))}
          {visibleProjects.length === 0 && <p className="py-8 text-center text-sm text-gray-500">Não existem projetos nesta vista.</p>}
        </div>
      </PanelContainer>
      <Drawer
        actions={<Button onClick={saveProject}>{editingProject ? "Guardar alterações" : "Criar projeto"}</Button>}
        description={editingProject ? "Atualize os dados do projeto." : "Adicione um novo projeto ao portefólio."}
        onOpenChange={setIsEditorOpen}
        open={isEditorOpen}
        title={editingProject ? "Editar projeto" : "Novo projeto"}
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome
            <input className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50" onChange={(event) => setDraft({ ...draft, name: event.target.value })} value={draft.name} />
          </label>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Responsável
            <input className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50" onChange={(event) => setDraft({ ...draft, owner: event.target.value })} value={draft.owner} />
          </label>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Estado
            <select className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50" onChange={(event) => setDraft({ ...draft, status: event.target.value })} value={draft.status}>
              <option>Planeamento</option>
              <option>Em curso</option>
              <option>Concluído</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Progresso: {draft.progress}%
            <input className="mt-2 w-full" max="100" min="0" onChange={(event) => setDraft({ ...draft, progress: Number(event.target.value) })} type="range" value={draft.progress} />
          </label>
        </div>
      </Drawer>
      <ConfirmDialog
        confirmLabel="Eliminar"
        description={`O projeto ${projectToDelete?.name ?? ""} será removido permanentemente.`}
        onConfirm={() => {
          onDelete(projectToDelete.id);
          setProjectToDelete(null);
        }}
        onOpenChange={(isOpen) => !isOpen && setProjectToDelete(null)}
        open={Boolean(projectToDelete)}
        title="Eliminar projeto?"
      />
    </div>
  );
}
