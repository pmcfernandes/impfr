import { Accordion, AlertBox, Button, PanelContainer, SubHeader, useStore } from "@pmcfernandes/app-shell";

const helpItems = [
  { id: "storage", title: "Onde são guardadas as preferências?", content: "As preferências deste exemplo são guardadas em localStorage neste navegador." },
  { id: "theme", title: "Como alterar o tema?", content: "Use o botão de tema no cabeçalho para alternar entre os modos claro e escuro." },
];

export function SettingsPage() {
  const [workspaceName, setWorkspaceName, removeWorkspaceName] = useStore("app-shell:workspace-name", "Backoffice");

  return (
    <div className="w-full">
      <SubHeader className="mb-6" description="Configure as preferências do espaço de trabalho." title="Definições" />
      <AlertBox className="mb-6" description="As alterações são guardadas automaticamente neste navegador." title="Preferências locais" variant="info" />
      <PanelContainer title="Espaço de trabalho">
        <label className="block max-w-md text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="workspace-name">
          Nome
          <input className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50" id="workspace-name" onChange={(event) => setWorkspaceName(event.target.value)} value={workspaceName} />
        </label>
        <Button className="mt-4" onClick={removeWorkspaceName} variant="secondary">Repor predefinição</Button>
      </PanelContainer>
      <PanelContainer className="mt-6" title="Ajuda">
        <Accordion defaultOpenItems={["storage"]} items={helpItems} />
      </PanelContainer>
    </div>
  );
}
