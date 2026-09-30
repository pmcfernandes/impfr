import { Button, PanelContainer, useStore } from "@pmcfernandes/app-shell";

export function StoreDemo() {
  const [workspaceName, setWorkspaceName, removeWorkspaceName] = useStore("app-shell:workspace-name", "Backoffice");

  return (
    <PanelContainer className="mt-6" description="Este valor é guardado em localStorage e mantém-se depois de recarregar a página." title="Preferência persistente">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="workspace-name">
        Nome do espaço de trabalho
      </label>
      <input
        className="mt-2 w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:ring-blue-950"
        id="workspace-name"
        onChange={(event) => setWorkspaceName(event.target.value)}
        value={workspaceName}
      />
      <Button className="mt-3" onClick={removeWorkspaceName} variant="secondary">Repor valor</Button>
    </PanelContainer>
  );
}
