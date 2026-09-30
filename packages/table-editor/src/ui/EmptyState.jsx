import { Inbox } from "lucide-react";

export function EmptyState({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-900">
        <Inbox className="h-5 w-5" />
      </span>
      <p className="font-medium text-gray-900 dark:text-gray-100">{title}</p>
      {hint && <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
