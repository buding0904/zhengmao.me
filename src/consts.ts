import type { Site, Metadata } from "@types";

export const SITE: Site = {
  NAME: "Mao",
  EMAIL: "zhengmao0613@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_NOTES_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Zheng Mao — a nobody Frontend Engineer.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION:
    "Articles on frontend engineering and things I find interesting.",
};

export const NOTES: Metadata = {
  TITLE: "Notes",
  DESCRIPTION: "Short notes, thoughts, and casual writing.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects.",
};
