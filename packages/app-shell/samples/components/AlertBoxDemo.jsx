import { CircleAlert } from "lucide-react";
import { AlertBox } from "@app-shell/react";

export function AlertBoxDemo() {
  return (
    <AlertBox
      className="mt-6"
      description="Existem duas tarefas sem responsável. Atribua-as para manter o projeto dentro do prazo."
      icon={<CircleAlert size={18} />}
      title="Ação necessária"
      variant="danger"
    />
  );
}
