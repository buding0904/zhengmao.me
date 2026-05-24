---
title: "vite-assets-browser"
description: "一个在开发时浏览项目静态资源的 Vite 插件和 CLI 工具。"
date: "Apr 01 2025"
demoURL: ""
repoURL: "https://github.com/buding0904/vite-assets-browser"
---

当开发业务项目时，我们经常会在前端项目放一些业务相关的静态资源，特别是图片（svg、png 等等），在后续的开发过程中，如果我不知道项目中有些什么图片/图标资源，那么我们一般会打开文件浏览器如 macOS Finder 等查看图片/图标长什么样子，问题在于，如果在 svg 中使用了 `currentColor`，那么在 Finder 中就看不见这个图片了。而在编辑器（如 vscode）内又不太方便找到我们想要的图标，严重影响效率。

于是我开发了这个工具。它会扫描项目目录，把所有图片、视频、字体以网格形式展示出来，并且用网格透明背景作为图片背景，避免 svg 看不见的情况。
