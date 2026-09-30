import { Bell } from "lucide-react";
import { useState } from "react";
import { Drawer } from "@pmcfernandes/app-shell";

const notifications = [
  { id: 1, title: "Relatório mensal disponível", description: "O relatório de setembro está pronto para revisão." },
  { id: 2, title: "Nova tarefa atribuída", description: "Foi-lhe atribuída a tarefa Rever proposta comercial." },
  { id: 3, title: "Projeto atualizado", description: "O projeto Website institucional foi atualizado." },
];

export function NotificationsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Abrir notificações"
        className="relative inline-flex size-9 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-50"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Bell aria-hidden="true" size={17} />
        <span className="absolute -right-1 -top-1 inline-flex size-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-semibold text-white">
          {notifications.length}
        </span>
      </button>
      <Drawer
        onOpenChange={setIsOpen}
        open={isOpen}
        title="Notificações"
      >
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {notifications.map((notification) => (
            <li className="py-4 first:pt-0" key={notification.id}>
              <p className="text-sm font-medium text-gray-950 dark:text-gray-50">{notification.title}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
