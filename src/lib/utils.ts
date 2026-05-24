import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const cjkCount = (textOnly.match(/[\u3400-\u9fff\uf900-\ufaff]/g) ?? []).length;
  const latinWordCount = textOnly
    .replace(/[\u3400-\u9fff\uf900-\ufaff]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const readingTimeMinutes = Math.max(
    1,
    Math.ceil(cjkCount / 500 + latinWordCount / 200),
  );
  return `${readingTimeMinutes} min read`;
}

export function contentLang(entry: { slug: string }) {
  const fileName = entry.slug.split("/").pop();
  return fileName === "zh" ? "zh" : "en";
}

export function contentSlug(entry: { slug: string }) {
  return entry.slug.replace(/\/(?:en|zh)$/, "");
}

export function contentAssetBase(entry: { collection: string; slug: string }) {
  return "/src/content/" + entry.collection + "/" + contentSlug(entry) + "/assets";
}
