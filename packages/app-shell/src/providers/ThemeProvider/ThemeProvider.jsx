import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "app-shell:theme";

function readStoredTheme(fallback) {
  try {
    const stored = window.sessionStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // Sessão indisponível: usa o tema inicial.
  }
  return fallback;
}

export function ThemeProvider({ children, initialTheme = "light" }) {
  // A escolha guardada em sessão prevalece sobre o tema inicial.
  const [theme, setTheme] = useState(() => readStoredTheme(initialTheme));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.sessionStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Sessão indisponível: o tema aplica-se só em memória.
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
