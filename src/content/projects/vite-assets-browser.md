---
title: "vite-assets-browser"
description: "A Vite plugin and CLI tool for browsing project assets during development."
date: "Apr 01 2025"
demoURL: ""
repoURL: "https://github.com/buding0904/vite-assets-browser"
lang: "en"
---

When building a frontend project, it's common to accumulate a lot of static assets — especially icons and images (SVG, PNG, etc.). When you can't remember what's already in the project, the usual move is to open a file browser like macOS Finder. The problem: Finder renders SVGs on a white background, so anything using `currentColor` becomes completely invisible. And browsing inside an editor like VS Code isn't great either — it seriously kills efficiency.

So I built this tool. It scans the project directory and presents all images, videos, and fonts in a grid with a checkerboard background, so SVGs are always visible no matter what.
