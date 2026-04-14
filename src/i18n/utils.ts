import { DEFAULT_LANG, isValidLang, type Lang } from "./types";
import { ui, type UIKey } from "./ui";

/**
 * Get the language from Astro's currentLocale or URL pathname.
 */
export function getLangFromUrl(url: URL, currentLocale?: string): Lang {
  // Prefer Astro's built-in currentLocale if available
  if (currentLocale && isValidLang(currentLocale)) {
    return currentLocale;
  }

  // Fallback: parse from URL
  const [, first] = url.pathname.split("/");
  if (isValidLang(first)) return first;
  return DEFAULT_LANG;
}

/**
 * Return a translation function bound to the given language.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[DEFAULT_LANG] as Record<string, string>)[key] ?? key;
  };
}

/**
 * Given a pathname and a target language, return the equivalent path in that language.
 */
export function pathForLang(pathname: string, targetLang: Lang): string {
  // Strip existing lang prefix
  const [, first, ...rest] = pathname.split("/");
  const hasLangPrefix = isValidLang(first);
  const segments = hasLangPrefix ? rest : [first, ...rest];

  if (targetLang === DEFAULT_LANG) {
    return "/" + segments.filter(Boolean).join("/");
  }
  return "/" + [targetLang, ...segments.filter(Boolean)].join("/");
}

/**
 * Return the base path prefix for a language (used in links).
 */
export function langBase(lang: Lang): string {
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

/**
 * Dynamically extract all `home.bio.*` lines for the given language,
 * sorted numerically by their suffix. This way you can add/remove
 * bio paragraphs in ui.ts without touching the page template.
 */
export function getBioLines(lang: Lang): string[] {
  const dict = ui[lang] as Record<string, string>;
  return Object.keys(dict)
    .filter((key) => key.startsWith("home.bio."))
    .sort((a, b) => {
      const na = parseInt(a.replace("home.bio.", ""), 10);
      const nb = parseInt(b.replace("home.bio.", ""), 10);
      return na - nb;
    })
    .map((key) => dict[key]);
}
