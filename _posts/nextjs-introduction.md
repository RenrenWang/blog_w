---
title: 'Next.js入门指南：构建现代Web应用'
date: '2023-01-15'
excerpt: '本文介绍了Next.js的基础知识，包括安装、路由、数据获取和部署等内容。'
coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
tags: ['Next.js', '前端', 'React', '教程']
---

# Next.js入门指南：构建现代Web应用

Next.js是一个基于React的全栈框架，它使构建高性能、SEO友好的Web应用变得简单。本文将介绍Next.js的基础知识，帮助你快速入门。

## 什么是Next.js？

Next.js是由Vercel开发的React框架，它提供了许多开箱即用的功能，包括：

- **服务器端渲染(SSR)**：提高首屏加载速度和SEO表现
- **静态站点生成(SSG)**：预渲染页面，提供极快的加载速度
- **文件系统路由**：基于文件结构的直观路由系统
- **API路由**：轻松创建API端点
- **内置CSS和Sass支持**：简化样式管理
- **代码分割和打包优化**：提高应用性能

## 安装和设置

创建一个新的Next.js项目非常简单：

```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

这将创建一个新的Next.js项目并启动开发服务器，你可以在浏览器中访问`http://localhost:3000`查看你的应用。

## 文件系统路由

Next.js使用基于文件系统的路由。在`pages`目录（或使用App Router时的`app`目录）中创建的每个文件都会自动成为一个路由：

- `pages/index.js` → `/`
- `pages/about.js` → `/about`
- `pages/blog/[id].js` → `/blog/:id`（动态路由）

## 数据获取

Next.js提供了几种数据获取方法：

### getStaticProps（静态生成）

```typescript
export async function getStaticProps() {
  const data = await fetchData()
  return {
    props: { data },
    revalidate: 60 // 可选，启用ISR（增量静态再生成）
  }
}
```

### getStaticPaths（动态路由的静态生成）

```typescript
export async function getStaticPaths() {
  const paths = await fetchPaths()
  return {
    paths,
    fallback: false // 或 true 或 'blocking'
  }
}
```

### getServerSideProps（服务器端渲染）

```typescript
export async function getServerSideProps(context) {
  const data = await fetchData(context.params)
  return {
    props: { data }
  }
}
```

## App Router（应用路由器）

Next.js 13引入了新的App Router，它基于React Server Components，提供了更强大的路由功能：

```
app/
├── layout.tsx      # 根布局
├── page.tsx        # 首页
├── about/
│   └── page.tsx    # 关于页面
└── blog/
    ├── layout.tsx  # 博客布局
    ├── page.tsx    # 博客列表页
    └── [id]/
        └── page.tsx # 博客详情页
```

## 部署

Next.js应用可以部署到任何支持Node.js的环境，但最简单的方式是使用Vercel：

```bash
npm install -g vercel
vercel
```

也可以部署到其他平台，如Netlify、AWS、DigitalOcean等。

## 结语

Next.js是一个功能强大且易于使用的框架，适合构建各种类型的Web应用。本文只是一个简单的入门指南，Next.js还有许多高级功能等待你去探索。

