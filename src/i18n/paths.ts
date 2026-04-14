import { LANGUAGES, DEFAULT_LANG, type Lang } from "./types";

/**
 * Returns getStaticPaths entries for all supported languages.
 * Uses [...lang] catch-all routing:
 *   - Default lang (en) → params.lang = undefined → generates "/"
 *   - Other langs      → params.lang = "zh"      → generates "/zh/"
 */
export function getLangStaticPaths() {
  return Object.keys(LANGUAGES).map((lang) => ({
    params: { lang: lang === DEFAULT_LANG ? undefined : lang },
    props: { lang: lang as Lang },
  }));
}
