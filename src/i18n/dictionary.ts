import es from "@/i18n/locales/es.json";
import en from "@/i18n/locales/en.json";

export type Locale = "es" | "en";

const dictionaries: Record<Locale, any> = {
  es,
  en,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.es;
}

/**
 * Deep-lookup a translation key in a dictionary.
 * Example: t(dict, "nav.cta") -> "Hablemos de tu proyecto"
 */
export function t<T = string>(
  dict: any,
  key: string,
  fallback: T,
): T {
  const parts = key.split(".");
  let value: any = dict;
  for (const part of parts) {
    if (value == null || typeof value !== "object") return fallback;
    value = value[part];
  }
  return typeof value === "string" ? (value as T) : fallback;
}
