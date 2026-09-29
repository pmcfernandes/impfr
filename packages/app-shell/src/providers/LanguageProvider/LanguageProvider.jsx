import { createContext, useContext, useState } from "react";
import { createTranslator } from "../../i18n/index.js";

export const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLanguage = "pt" }) {
  const [language, setLanguage] = useState(initialLanguage);
  const t = createTranslator(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
