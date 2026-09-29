import { en } from "./en.js";
import { pt } from "./pt.js";

const dictionaries = { pt, en };

/** Tradutor simples: t("search") -> string localizada. */
export function createTranslator(locale = "pt") {
  const dict = dictionaries[locale] ?? dictionaries.pt;
  return (key) => dict[key] ?? dictionaries.en[key] ?? key;
}

export function useTranslator(locale = "pt") {
  return createTranslator(locale);
}
