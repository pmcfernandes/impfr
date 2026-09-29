import { useState } from "react";
import { Badge, PanelContainer, Tabs } from "@app-shell/react";

const tabs = [
  { label: "Atividade", value: "activity" },
  { label: "Alertas", value: "alerts" },
];

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <PanelContainer className="mt-6" title="Atualizações">
      <Tabs onValueChange={setActiveTab} tabs={tabs} value={activeTab} />
      {activeTab === "activity" ? (
        <p className="pt-4 text-sm text-gray-600 dark:text-gray-300">A equipa concluiu 14 tarefas desde a última atualização.</p>
      ) : (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">Existem 2 tarefas sem responsável.</p>
          <Badge variant="warning">Requer atenção</Badge>
        </div>
      )}
    </PanelContainer>
  );
}
