import { useState } from "react";
import { Button, ConfirmDialog, Dialog, Drawer, PanelContainer } from "@pmcfernandes/app-shell";

export function OverlaysDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <PanelContainer className="mt-6" description="Componentes para apresentar ações sem mudar de página." title="Overlays">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setIsDialogOpen(true)}>Abrir diálogo</Button>
        <Button onClick={() => setIsDrawerOpen(true)}>Abrir painel</Button>
        <Button onClick={() => setIsConfirmDialogOpen(true)} variant="danger">Confirmar ação</Button>
      </div>
      <Dialog
        actions={<Button onClick={() => setIsDialogOpen(false)}>Confirmar</Button>}
        description="Confirme a ação para continuar."
        onOpenChange={setIsDialogOpen}
        open={isDialogOpen}
        title="Confirmar alteração"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">Esta operação será aplicada imediatamente.</p>
      </Dialog>
      <Drawer
        actions={<Button onClick={() => setIsDrawerOpen(false)}>Fechar</Button>}
        description="Informação adicional sem sair da página."
        onOpenChange={setIsDrawerOpen}
        open={isDrawerOpen}
        title="Detalhes do projeto"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">O projeto está dentro do prazo e tem 8 tarefas em curso.</p>
      </Drawer>
      <ConfirmDialog
        confirmLabel="Eliminar"
        description="Esta ação não pode ser revertida."
        onConfirm={() => setIsConfirmDialogOpen(false)}
        onOpenChange={setIsConfirmDialogOpen}
        open={isConfirmDialogOpen}
        title="Eliminar projeto?"
      />
    </PanelContainer>
  );
}
