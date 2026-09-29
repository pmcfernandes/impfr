import { Moon, Sun } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../providers/ThemeProvider/index.js";

export function ThemeSwitch({ theme: controlledTheme, defaultTheme = "light", onThemeChange }) {
  const [uncontrolledTheme, setUncontrolledTheme] = useState(defaultTheme);
  const themeContext = useContext(ThemeContext);
  const theme = controlledTheme ?? themeContext?.theme ?? uncontrolledTheme;
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    if (controlledTheme === undefined) {
      if (themeContext) themeContext.setTheme(nextTheme);
      else setUncontrolledTheme(nextTheme);
    }
    onThemeChange?.(nextTheme);
  }

  return (
    <button
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="inline-flex size-9 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-50"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? <Sun aria-hidden="true" size={17} /> : <Moon aria-hidden="true" size={17} />}
    </button>
  );
}
