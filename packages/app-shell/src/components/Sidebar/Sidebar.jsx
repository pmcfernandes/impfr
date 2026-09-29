import { createTranslator } from "../../i18n/index.js";
import { LogOut, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import md5 from "md5";
import { useState } from "react";
import { cx } from "../../ui/cx.js";

export function Sidebar({
  title,
  titleIcon,
  description,
  sections,
  navigation = [],
  activeNavigationId,
  isOpen = false,
  isCollapsed = false,
  locale = "pt",
  onNavigate,
  onToggleCollapsed,
  className,
  userName,
  userEmail,
  onLogout,
}) {
  const t = createTranslator(locale);
  const [search, setSearch] = useState("");
  const normalizedSections =
    Array.isArray(sections) && sections.length > 0
      ? sections
        : navigation.some((item) => Array.isArray(item.items))
          ? navigation
          : [{ id: "navigation", items: navigation }];
  const normalizedSearch = search.trim().toLocaleLowerCase(locale);
  const filteredSections = normalizedSections
    .map((section) => ({
      ...section,
      items: (section.items ?? []).filter((item) => item.label?.toLocaleLowerCase(locale).includes(normalizedSearch)),
    }))
    .filter((section) => section.items.length > 0);
  const avatarUrl = `https://www.gravatar.com/avatar/${md5((userEmail ?? "").trim().toLowerCase())}?d=identicon&s=64`;

  function handleNavigation(item) {
    onNavigate?.(item);
  }

  return (
    <aside
      className={cx(
        "flex flex-col border-b border-gray-200 bg-white p-3 md:flex md:border-r md:border-b-0 dark:border-gray-800 dark:bg-gray-950",
        isOpen ? "flex" : "hidden",
        className,
      )}
    >
      <div className={cx("mb-4 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && title && (
          <div className="px-2">
            <div className="flex items-center gap-2 text-gray-950 dark:text-gray-50">
              {titleIcon && <span aria-hidden="true" className="flex size-4 items-center justify-center">{titleIcon}</span>}
              <p className="text-sm font-semibold uppercase tracking-wider">{title}</p>
            </div>
            {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
        )}
        <button
          aria-label={t(isCollapsed ? "expandSidebar" : "collapseSidebar")}
          className="rounded-md p-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
          onClick={onToggleCollapsed}
          title={t(isCollapsed ? "expandSidebar" : "collapseSidebar")}
          type="button"
        >
          {isCollapsed ? <PanelLeftOpen aria-hidden="true" size={16} /> : <PanelLeftClose aria-hidden="true" size={16} />}
        </button>
      </div>
      {!isCollapsed && (
        <label className="relative mb-5 block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <span className="sr-only">{t("search")}</span>
          <input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-9 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:ring-blue-950"
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("search")}
            type="search"
            value={search}
          />
        </label>
      )}
      <nav aria-label={t("menu")} className="flex-1 space-y-5">
        {filteredSections.map((section, sectionIndex) => (
          <div key={section.id ?? section.label ?? sectionIndex}>
            {section.label && !isCollapsed && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {section.label}
              </p>
            )}
            <div className="space-y-1">
              {(section.items ?? []).map((item) => {
                const isActive = item.id === activeNavigationId;
                const className = cx(
                  "flex w-full items-center rounded-md py-2 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
                  isCollapsed ? "justify-center px-2" : "gap-3 px-3",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                );
                const content = (
                  <>
                    <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center">
                      {item.icon ?? item.label?.slice(0, 1)}
                    </span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </>
                );

                return item.href ? (
                  <a
                    aria-label={isCollapsed ? item.label : undefined}
                    className={className}
                    href={item.href}
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    aria-label={isCollapsed ? item.label : undefined}
                    className={className}
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    title={isCollapsed ? item.label : undefined}
                    type="button"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      {userName && (
        <div className="mt-6 border-t border-gray-200 pt-3 dark:border-gray-800">
          <div className={cx("mb-2 flex items-center", isCollapsed ? "justify-center" : "gap-2 px-3")}>
            <img alt={userName} className="size-7 rounded-full" height="28" src={avatarUrl} width="28" />
            {!isCollapsed && <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">{userName}</p>}
          </div>
          <button
            aria-label={t("logout")}
            className={cx(
              "flex w-full items-center rounded-md py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
              isCollapsed ? "justify-center px-2" : "gap-3 px-3",
            )}
            onClick={onLogout}
            title={isCollapsed ? t("logout") : undefined}
            type="button"
          >
            {!isCollapsed && <span>{t("logout")}</span>}
            <LogOut aria-hidden="true" className={isCollapsed ? undefined : "ml-auto"} size={18} />
          </button>
        </div>
      )}
    </aside>
  );
}
