import { en } from "./en.js";
import { pt } from "./pt.js";

const dictionaries = { en, pt };

export function createTranslator(locale = "pt") {
  const dictionary = dictionaries[locale] ?? dictionaries.pt;
  return (key) => dictionary[key] ?? dictionaries.en[key] ?? key;
}
