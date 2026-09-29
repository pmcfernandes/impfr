import { FolderKanban, House, Settings } from "lucide-react";

export const navigation = [
  {
    id: "workspace",
    label: "Área de trabalho",
    items: [
      { id: "home", label: "Início", icon: <House size={18} strokeWidth={1.75} /> },
      { id: "projects", label: "Projetos", icon: <FolderKanban size={18} strokeWidth={1.75} /> },
    ],
  },
  {
    id: "account",
    label: "Conta",
    items: [{ id: "settings", label: "Definições", icon: <Settings size={18} strokeWidth={1.75} /> }],
  },
];
