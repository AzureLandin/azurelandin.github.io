# 我的博客（Hexo + NexT）

基于 [Hexo](https://hexo.io/zh-cn/) + [NexT](https://theme-next.js.org/) 主题，部署到 GitHub Pages。

## 项目结构

```
├── _config.yml             # 站点主配置（标题、作者、部署等）
├── themes/next/            # NexT 主题（主题配置在 themes/next/_config.yml）
├── source/
│   ├── _posts/             # 文章目录（Markdown 文件）
│   ├── tags/               # 标签页（type: tags）
│   └── categories/         # 分类页（type: categories）
├── scaffolds/              # 新建文章的模板
└── .github/workflows/deploy.yml  # GitHub Actions 自动部署
```

## ⚠️ 首次使用前：替换占位配置

打开 `_config.yml`，找到并替换以下内容：

| 位置 | 占位内容 | 改成 |
|---|---|---|
| `url` | `https://AzureLandin.github.io` | 无需修改 |
| `deploy.repo` | `https://github.com/AzureLandin/AzureLandin.github.io.git` | 无需修改（仅用 `hexo d` 方式时需要） |

| `author` | `你的名字` | 你的名字/昵称 |
| `title` | `我的博客` | 博客名（可选） |

另外在终端设置 git 身份（首次提交前）：
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

## 部署到 GitHub Pages（推荐：Actions 自动部署）

> ⚠️ 注意：以下流程会把构建好的博客**覆盖推送到仓库 `main` 分支**。如果 `main` 上现在有内容（比如原来的首页），请先备份。

1. 初始化并创建 `source` 分支（博客源码放这里）：

```bash
git init
git checkout -b source
git add -A
git commit -m "init blog"
git remote add origin https://github.com/AzureLandin/AzureLandin.github.io.git
git push -u origin source
```

2. push 后 GitHub Actions 会自动构建并部署到 `main` 分支。
3. 到 GitHub 仓库 **Settings → Pages**，确认：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **main**，文件夹 **/ (root)**
4. 等 Actions 跑完（1~2 分钟），访问 `https://你的用户名.github.io`。

之后每次更新博客：**改完内容直接 `git push` 即可，自动发布**。

### 备选：本地一键部署（不用 Actions）

在 `_config.yml` 中：
- 填好 `deploy.repo` 为你的仓库地址
- 将 `deploy` 下 `branch: main` 保留

然后本地执行：
```bash
hexo d
```
即可把构建结果推送到 GitHub。

## 日常写作

```bash
hexo new "文章标题"        # 新建文章
hexo server                # 本地预览 http://localhost:4000
```

编辑 `source/_posts/文章标题.md`：

```markdown
---
title: 文章标题
date: 2025-01-01 10:00:00
tags: [标签1, 标签2]
categories: 分类名
---

正文用 Markdown 写。
```

发布（Actions 方式）：
```bash
git add -A && git commit -m "新文章"
git push
```

## 常用命令

| 命令 | 作用 |
|---|---|
| `hexo new "标题"` | 新建文章 |
| `hexo server` | 本地预览 |
| `hexo generate` / `npm run build` | 构建静态文件到 `public/` |
| `hexo clean` | 清理缓存（构建异常时用） |
| `hexo d` | 一键部署到 GitHub |

## 换主题 / 加插件

- **主题**：[Hexo 主题市场](https://hexo.io/themes/)，下载到 `themes/` 并在 `_config.yml` 改 `theme:` 名称
- **插件**：[Hexo 插件市场](https://hexo.io/plugins/)，`npm install 插件名 --save` 后按插件文档配置

更多 NexT 玩法（评论、统计、头像、友链等）见 [NexT 官方文档](https://theme-next.js.org/docs/)。