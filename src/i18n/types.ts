export type Lang = "en" | "zh";

export const LANGUAGES: Record<Lang, string> = {
  en: "English",
  zh: "中文",
};

export const DEFAULT_LANG: Lang = "en";

export function isValidLang(lang: string): lang is Lang {
  return lang in LANGUAGES;
}
