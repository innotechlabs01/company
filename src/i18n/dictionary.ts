import es from "@/i18n/locales/es.json";
import en from "@/i18n/locales/en.json";

export type Locale = "es" | "en";

const dictionaries: Record<Locale, Record<string, unknown>> = {
  es,
  en,
};

export function getDictionary(locale: Locale): Record<string, unknown> {
  return dictionaries[locale] || dictionaries.es;
}

/**
 * Deep-lookup a translation key in a dictionary.
 * Example: t(dict, "nav.cta") -> "Hablemos de tu proyecto"
 */
export function t<T = string>(
  dict: Record<string, unknown>,
  key: string,
  fallback: T,
): T {
  const parts = key.split(".");
  let value: unknown = dict;
  for (const part of parts) {
    if (value == null || typeof value !== "object") return fallback;
    value = (value as Record<string, unknown>)[part];
  }
  if (value === undefined || value === null) return fallback;
  if (typeof fallback === "string") {
    return typeof value === "string" ? (value as T) : fallback;
  }
  if (Array.isArray(fallback)) {
    return Array.isArray(value) ? (value as T) : fallback;
  }
  return value as T;
}
