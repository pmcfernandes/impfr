import { X } from "lucide-react";
import { useEffect, useId } from "react";
import { cx } from "../../ui/cx.js";

export function Dialog({ open, onOpenChange, title, description, actions, children, className }) {
  const titleId = useId();

  // Permite aumentar a largura via className (ex.: max-w-6xl/max-w-7xl):
  // se for passado um max-w-*, não aplicamos o max-w-lg por omissão para
  // evitar conflito de classes no Tailwind.
  const hasCustomMaxWidth = typeof className === "string" && className.includes("max-w-");
  const panelClassName = cx(
    "w-full rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-950",
    hasCustomMaxWidth ? null : "max-w-lg",
    className,
  );

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onOpenChange?.(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  if (!open) return null;

  return (
    <div
      aria-labelledby={title ? titleId : undefined}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4"
      onClick={() => onOpenChange?.(false)}
      role="dialog"
    >
      <div
        className={panelClassName}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            {title && <h2 className="text-base font-semibold text-gray-950 dark:text-gray-50" id={titleId}>{title}</h2>}
            {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
          <button
            aria-label="Fechar"
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-900 dark:hover:text-gray-50"
            onClick={() => onOpenChange?.(false)}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {actions && <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-700">{actions}</div>}
      </div>
    </div>
  );
}
