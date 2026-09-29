import { useContext, useState } from "react";
import { Menu } from "lucide-react";
import { normalizeAppShellConfig } from "../../core/config.js";
import { createTranslator } from "../../i18n/index.js";
import { cx } from "../../ui/cx.js";
import { LanguageContext } from "../../providers/LanguageProvider/index.js";
import { Breadcrumbs } from "../Breadcrumbs/index.js";
import { Sidebar } from "../Sidebar/index.js";

export function AppShell({
  config,
  title,
  titleIcon,
  description,
  userName,
  userEmail,
  navigation,
  activeNavigationId,
  breadcrumbs,
  locale,
  headerActions,
  children,
  onNavigate,
  onLogout,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const language = useContext(LanguageContext);
  const resolvedLocale = locale ?? language?.language ?? "pt";
  const settings = normalizeAppShellConfig({
    ...config,
    ...(title !== undefined && { title }),
    ...(titleIcon !== undefined && { titleIcon }),
    ...(description !== undefined && { description }),
    ...(userName !== undefined && { userName }),
    ...(userEmail !== undefined && { userEmail }),
    ...(navigation !== undefined && { navigation }),
    ...(activeNavigationId !== undefined && { activeNavigationId }),
  });
  const t = createTranslator(resolvedLocale);

  function handleNavigation(item) {
    setIsSidebarOpen(false);
    onNavigate?.(item);
  }

  return (
    <div
      className={cx(
        "flex min-h-screen flex-col bg-gray-50 text-gray-950 md:grid md:grid-rows-[auto_1fr] dark:bg-gray-950 dark:text-gray-50",
        isSidebarCollapsed ? "md:grid-cols-[4.5rem_minmax(0,1fr)]" : "md:grid-cols-[16rem_minmax(0,1fr)]",
      )}
    >
      <header className="sticky top-0 order-1 z-20 flex min-h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 md:col-start-2 dark:border-gray-800 dark:bg-gray-950">
        <button
          aria-expanded={isSidebarOpen}
          aria-label={t("menu")}
          className="inline-flex items-center rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm md:hidden dark:border-gray-700 dark:text-gray-300"
          onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
          type="button"
        >
          <Menu aria-hidden="true" size={16} />
          <span className="sr-only">{t("menu")}</span>
        </button>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="ml-auto">{headerActions}</div>
      </header>
      <Sidebar
        activeNavigationId={settings.activeNavigationId}
        className="order-2 md:col-start-1 md:row-span-2 md:row-start-1 md:h-screen md:sticky md:top-0"
        isCollapsed={isSidebarCollapsed}
        isOpen={isSidebarOpen}
        locale={resolvedLocale}
        navigation={settings.navigation}
        onNavigate={handleNavigation}
        onToggleCollapsed={() => setIsSidebarCollapsed((isCollapsed) => !isCollapsed)}
        description={settings.description}
        title={settings.title}
        titleIcon={settings.titleIcon}
        userName={settings.userName}
        userEmail={settings.userEmail}
        onLogout={onLogout ?? settings.onLogout}
      />
      <main className="order-3 flex min-h-[calc(100vh-4rem)] min-w-0 flex-col p-4 sm:p-6 md:col-start-2 md:min-h-0">
        <div className="size-full flex-1">{children}</div>
      </main>
    </div>
  );
}
