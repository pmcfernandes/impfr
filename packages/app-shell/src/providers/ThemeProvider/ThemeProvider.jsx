import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children, initialTheme = "light" }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
