import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cx } from "../../ui/cx.js";

export function Accordion({ items = [], openItems, defaultOpenItems = [], onOpenChange, multiple = false, className }) {
  const [uncontrolledOpenItems, setUncontrolledOpenItems] = useState(defaultOpenItems);
  const activeItems = openItems ?? uncontrolledOpenItems;

  function toggleItem(id) {
    const isOpen = activeItems.includes(id);
    const nextItems = isOpen
      ? activeItems.filter((itemId) => itemId !== id)
      : multiple
        ? [...activeItems, id]
        : [id];

    if (openItems === undefined) setUncontrolledOpenItems(nextItems);
    onOpenChange?.(nextItems);
  }

  return (
    <div className={cx("divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800", className)}>
      {items.map((item) => {
        const isOpen = activeItems.includes(item.id);

        return (
          <div key={item.id}>
            <button
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-gray-950 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-50 dark:hover:bg-gray-900"
              disabled={item.disabled}
              onClick={() => toggleItem(item.id)}
              type="button"
            >
              {item.title}
              <ChevronDown aria-hidden="true" className={cx("shrink-0 text-gray-500 transition-transform", isOpen && "rotate-180")} size={18} />
            </button>
            {isOpen && <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
