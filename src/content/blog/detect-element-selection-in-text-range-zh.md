---
title: "空字符：检测选中状态的隐藏技巧"
description: "为什么飞书可以做到每个类型的 block 都有自定义的选中效果？它是如何知道我的鼠标有没有选中这个元素，背后的原理是怎样的？接下来我们将会探究飞书中实现元素选中状态判断的实现原理"
date: "Apr 01 2026"
draft: true
lang: "zh"
canonicalSlug: "detect-element-selection-in-text-range"
---

The basic configuration of Nano is pretty simple.

Edit `src/consts.ts`

Customize the base site

```ts
// src/consts.ts

export const SITE: Site = {
  NAME: "Astro Nano",
  EMAIL: "markhorn.dev@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};
```

| Field        | Req | Description                                          |
| :----------- | :-- | :--------------------------------------------------- |
| NAME         | Yes | Displayed in header and footer. Used in SEO and RSS. |
| EMAIL        | Yes | Displayed in contact section.                        |
| NUM_POSTS    | Yes | Limit num of posts on home page.                     |
| NUM_WORKS    | Yes | Limit num of works on home page.                     |
| NUM_PROJECTS | Yes | Limit num of projects on home page.                  |

Customize your page metadata

```ts
// src/consts.ts

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Astro Nano is a minimal and lightweight blog and portfolio.",
};
```

| Field       | Req | Description                                    |
| :---------- | :-- | :--------------------------------------------- |
| TITLE       | Yes | Displayed in browser tab. Used in SEO and RSS. |
| DESCRIPTION | Yes | Used in SEO and RSS.                           |

Customize your social media

```ts
// src/consts.ts

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://twitter.com/markhorn_dev",
  },
  {
    NAME: "github",
    HREF: "https://github.com/markhorn-dev",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/markhorn-dev",
  },
];
```

| Field | Req | Description                             |
| :---- | :-- | :-------------------------------------- |
| NAME  | Yes | Displayed in contact section as a link. |
| HREF  | Yes | External url to social media profile.   |
