import { Button } from "../../ui/Button.jsx";
import { Dialog } from "../Dialog/Dialog.jsx";

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirmar ação",
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  children,
}) {
  return (
    <Dialog
      actions={
        <>
          <Button onClick={() => onOpenChange?.(false)} variant="secondary">
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} variant="danger">
            {confirmLabel}
          </Button>
        </>
      }
      description={description}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
    >
      {children}
    </Dialog>
  );
}
