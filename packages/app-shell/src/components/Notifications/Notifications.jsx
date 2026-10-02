import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cx } from "../../ui/cx.js";

const NotificationsContext = createContext(null);

let nextToastId = 1;

const variantStyles = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    barClass: "bg-emerald-500",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-red-600 dark:text-red-400",
    barClass: "bg-red-500",
  },
  info: {
    icon: Info,
    iconClass: "text-blue-600 dark:text-blue-400",
    barClass: "bg-blue-500",
  },
};

export function NotificationProvider({ children, duration = 6000, max = 4 }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    (message, options = {}) => {
      const id = nextToastId++;
      const { title, variant = "info", duration: toastDuration } = options;
      setToasts((current) => [...current.slice(-(max - 1)), { id, message, title, variant }]);
      timers.current.set(id, setTimeout(() => dismiss(id), toastDuration ?? duration));
      return id;
    },
    [dismiss, duration, max],
  );

  useEffect(
    () => () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    },
    [],
  );

  const api = useMemo(
    () => ({
      notify,
      dismiss,
      success: (message, options) => notify(message, { ...options, variant: "success" }),
      error: (message, options) => notify(message, { ...options, variant: "error" }),
      info: (message, options) => notify(message, { ...options, variant: "info" }),
    }),
    [notify, dismiss],
  );

  return (
    <NotificationsContext.Provider value={api}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error("useNotifications must be used within a NotificationProvider");
  return context;
}

function Toast({ toast, onDismiss }) {
  const style = variantStyles[toast.variant] ?? variantStyles.info;
  const Icon = style.icon;
  return (
    <div
      className="pointer-events-auto flex w-full items-start gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
      role={toast.variant === "error" ? "alert" : "status"}
    >
      <span aria-hidden="true" className={cx("w-1 shrink-0 self-stretch", style.barClass)} />
      <Icon aria-hidden="true" className={cx("mt-3 h-5 w-5 shrink-0", style.iconClass)} />
      <div className="min-w-0 flex-1 py-3 pr-1">
        {toast.title && (
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{toast.title}</p>
        )}
        <p className="break-words text-sm text-gray-600 dark:text-gray-300">{toast.message}</p>
      </div>
      <button
        aria-label="Fechar notificação"
        className="m-2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        onClick={() => onDismiss(toast.id)}
        type="button"
      >
        <X aria-hidden="true" size={16} />
      </button>
    </div>
  );
}

export function Toaster({ toasts = [], onDismiss = () => {} }) {
  if (toasts.length === 0) return null;
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
