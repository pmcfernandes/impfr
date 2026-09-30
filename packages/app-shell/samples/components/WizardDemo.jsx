import { Wizard } from "@pmcfernandes/app-shell";

const steps = [
  {
    id: "details",
    title: "Detalhes",
    description: "Informação base",
    content: <p className="text-sm text-gray-600 dark:text-gray-300">Defina o nome e a descrição do novo projeto.</p>,
  },
  {
    id: "members",
    title: "Equipa",
    description: "Escolha participantes",
    content: <p className="text-sm text-gray-600 dark:text-gray-300">Adicione as pessoas responsáveis pelas tarefas do projeto.</p>,
  },
  {
    id: "review",
    title: "Revisão",
    description: "Confirmar dados",
    content: <p className="text-sm text-gray-600 dark:text-gray-300">Confirme os dados antes de criar o projeto.</p>,
  },
];

export function WizardDemo() {
  return <Wizard className="mt-6" steps={steps} />;
}
