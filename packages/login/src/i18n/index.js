import en from "./en.js";
import pt from "./pt.js";

const messages = { en, pt };

export function createTranslator(locale = "pt") {
  const dictionary = messages[locale] ?? messages.pt;
  return (key) => dictionary[key] ?? key;
}
