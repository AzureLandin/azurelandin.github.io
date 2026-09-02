---
title: 你好，我的新博客
date: 2025-01-01 10:00:00
tags: [Hexo, 随笔]
categories: 随笔
---

欢迎来到我的博客！这里使用 **Hexo + NexT 主题** 搭建，托管在 GitHub Pages 上。

## 如何写一篇文章

新建文章（在终端执行）：

```bash
hexo new "文章标题"
```

然后编辑 `source/_posts/文章标题.md`，用 Markdown 写作，开头是文章信息（标题、日期、标签、分类）：

```markdown
---
title: 文章标题
date: 2025-01-01 10:00:00
tags: [标签1, 标签2]
categories: 分类名
---

正文内容用 **Markdown** 写，支持代码高亮、图片、链接等。
```

## 如何发布

写好之后 push 到 GitHub 的 `source` 分支，GitHub Actions 会自动构建并部署，一两分钟后访问你的博客网址即可看到更新。

## 本地预览

```bash
hexo server
```

浏览器打开 http://localhost:4000 即可实时预览。