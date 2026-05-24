export const ui = {
  en: {
    // Nav
    "nav.blog": "blog",
    "nav.notes": "notes",
    "nav.projects": "projects",

    // Home
    "home.greeting": "Hi, I'm Zheng Mao",
    "home.bio.1":
      "I'm a frontend engineer slowly growing toward full-stack, building interesting little projects and sharing what I learn along the way.",
    "home.bio.2":
      "The best time to plant a tree was ten years ago. The second best time is now.",
    "home.latestPosts": "Latest posts",
    "home.seeAllPosts": "See all posts",
    "home.latestNotes": "Recent notes",
    "home.seeAllNotes": "See all notes",
    "home.recentProjects": "Recent Projects",
    "home.seeAllProjects": "See all projects",
    "home.connect": "Connect me",

    // Blog
    "blog.title": "Blog",
    "blog.backToBlog": "Back to blog",

    // Notes
    "notes.title": "Notes",
    "notes.backToNotes": "Back to notes",

    // Projects
    "projects.title": "Projects",
    "projects.backToProjects": "Back to projects",
    "projects.demo": "Demo",
    "projects.repo": "Repo",

    // Footer
    "footer.copyright": "Copyright © Zheng Mao",

    // Reading time
    readingTime: "min read",
  },
  zh: {
    // Nav
    "nav.blog": "博客",
    "nav.notes": "小记",
    "nav.projects": "项目",

    // Home
    "home.greeting": "你好，我是郑茂",
    "home.bio.1":
      "我是一名前端开发工程师，也在慢慢往全栈方向探索，想做一些有趣的小项目，也把一路上的心得体会分享给大家。",
    "home.bio.2": "种一棵树最好的时间是十年前，其次是现在。",
    "home.latestPosts": "最新文章",
    "home.seeAllPosts": "查看全部",
    "home.latestNotes": "最近小记",
    "home.seeAllNotes": "查看全部",
    "home.recentProjects": "最近项目",
    "home.seeAllProjects": "查看全部",
    "home.connect": "联系我",

    // Blog
    "blog.title": "博客",
    "blog.backToBlog": "返回博客",

    // Notes
    "notes.title": "小记",
    "notes.backToNotes": "返回小记",

    // Projects
    "projects.title": "项目",
    "projects.backToProjects": "返回项目列表",
    "projects.demo": "演示",
    "projects.repo": "仓库",

    // Footer
    "footer.copyright": "Copyright © Zheng Mao",

    // Reading time
    readingTime: "分钟阅读",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];
