import { cx } from "../../ui/cx.js";

export function Tabs({ tabs = [], value, onValueChange, label = "Navegação por separadores", className }) {
  return (
    <div aria-label={label} className={cx("border-b border-gray-200 dark:border-gray-800", className)} role="tablist">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.value === value;

          return (
            <button
              aria-selected={isActive}
              className={cx(
                "shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50",
              )}
              key={tab.value}
              onClick={() => onValueChange?.(tab.value)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
