# Next.js 个人博客系统

这是一个使用 Next.js 15、TypeScript、Tailwind CSS 和 Shadcn UI 构建的现代个人博客系统。支持代码高亮、评论系统和深色/浅色主题切换。

![博客首页截图](public/images/screenshot.png)

## 功能特点

- **响应式设计**：完美适配桌面、平板和移动设备
- **主题切换**：支持深色/浅色主题，自动适应系统设置
- **Markdown 博客**：使用 Markdown 格式编写文章，支持丰富的格式化选项
- **代码高亮**：使用 react-syntax-highlighter 实现精美的代码高亮显示
- **评论系统**：基于 MongoDB 的评论功能，支持实时刷新
- **标签分类**：文章标签系统，方便内容分类和查找
- **SEO 优化**：内置 SEO 元数据，提高搜索引擎可见性
- **高性能**：使用 Next.js 15 的最新特性，实现快速页面加载和渲染

## 技术栈

- **Next.js 15.2.1**：React 框架，提供服务端渲染、静态站点生成和 App Router
- **TypeScript**：类型安全的 JavaScript 超集
- **Tailwind CSS**：实用优先的 CSS 框架，快速构建现代界面
- **Shadcn UI**：基于 Radix UI 的组件库，提供美观且可访问的 UI 组件
- **MongoDB**：用于存储评论数据的 NoSQL 数据库
- **Mongoose**：MongoDB 对象模型工具，简化数据操作
- **gray-matter**：解析 Markdown 文件的前置元数据
- **remark/rehype**：强大的 Markdown 处理工具链
- **react-syntax-highlighter**：代码高亮组件，支持多种主题和语言

## 快速开始

### 前提条件

- Node.js 18.0.0 或更高版本
- pnpm、npm 或 yarn
- MongoDB（本地或远程）

### 安装

1. 克隆仓库

```bash
git clone https://github.com/yourusername/next-personal-blog.git
cd next-personal-blog
```

2. 安装依赖

```bash
pnpm install
# 或
npm install
# 或
yarn install
```

3. 配置环境变量

创建 `.env.local` 文件并添加以下内容：

```
MONGODB_URI=mongodb://localhost:27017/blog
```

根据你的 MongoDB 配置调整 URI。

4. 运行开发服务器

```bash
pnpm dev
# 或
npm run dev
# 或
yarn dev
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 添加博客文章

1. 在 `_posts` 目录中创建一个新的 Markdown 文件，例如 `my-new-post.md`
2. 添加前置元数据：

```markdown
---
title: '文章标题'
date: '2023-03-01'
excerpt: '文章摘要'
coverImage: '/images/cover.jpg'
tags: ['标签1', '标签2']
---

# 文章内容

这里是文章的正文内容...

## 代码示例

```javascript
function hello() {
  console.log('Hello, world!');
}
```

更多内容...
```

3. 重新启动开发服务器，新文章将自动显示在博客列表中

## 代码高亮功能

博客系统使用 `react-syntax-highlighter` 实现代码高亮，支持以下特性：

- 多种编程语言的语法高亮
- 行号显示
- 精美的主题（默认使用 oneDark 主题）
- 自适应宽度和响应式设计

在 Markdown 中使用代码块时，只需指定语言即可：

````markdown
```javascript
// 这里是 JavaScript 代码
function example() {
  return 'Hello World';
}
```
````

## 评论系统

博客系统包含一个基于 MongoDB 的评论功能，允许读者在文章下方发表评论。评论系统包括：

- **评论表单**：用户可以提供姓名、邮箱和评论内容
- **评论列表**：显示所有评论，按时间倒序排列
- **实时刷新**：发表评论后自动刷新评论列表
- **数据验证**：确保所有必填字段都已填写，并验证邮箱格式

评论数据存储在 MongoDB 中，通过 API 路由进行读写操作。

## 构建和部署

### 构建静态网站

```bash
pnpm build
# 或
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
pnpm start
# 或
npm run start
# 或
yarn start
```

### 部署

这个博客系统可以部署到任何支持 Node.js 的平台，如 Vercel、Netlify、AWS 等。

推荐使用 Vercel 进行部署：

```bash
npm install -g vercel
vercel
```

确保在部署环境中设置 `MONGODB_URI` 环境变量，指向你的 MongoDB 数据库。

## 自定义

### 修改主题

编辑 `app/globals.css` 文件中的 CSS 变量来自定义主题颜色。系统使用 HSL 颜色格式，便于调整：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* 更多颜色变量... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* 更多暗色主题变量... */
}
```

### 修改代码高亮主题

在 `app/blog/[id]/page.tsx` 文件中，你可以更改代码高亮的主题：

```typescript
// 导入不同的主题
import { 
  atomDark, 
  dracula, 
  materialDark, 
  oneDark, 
  synthwave84 
} from 'react-syntax-highlighter/dist/esm/styles/prism'

// 使用你喜欢的主题
<SyntaxHighlighter
  language={language}
  style={dracula} // 更改为你喜欢的主题
  // 其他配置...
>
  {code}
</SyntaxHighlighter>
```

### 添加新页面

在 `app` 目录中创建新的目录和 `page.tsx` 文件来添加新页面。例如，创建 `app/about/page.tsx` 添加"关于"页面。

## 项目结构

```
├── _posts/              # Markdown 博客文章
├── app/                 # Next.js 应用目录
│   ├── api/             # API 路由
│   ├── blog/            # 博客相关页面
│   │   ├── [id]/        # 博客详情页
│   │   └── page.tsx     # 博客列表页
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 首页
├── components/          # React 组件
│   ├── ui/              # UI 组件
│   ├── comments.tsx     # 评论组件
│   └── ...              # 其他组件
├── lib/                 # 工具函数和库
│   ├── blog.ts          # 博客相关函数
│   ├── mongodb.ts       # MongoDB 连接
│   └── utils.ts         # 通用工具函数
├── models/              # Mongoose 模型
│   └── comment.ts       # 评论模型
├── public/              # 静态资源
│   └── images/          # 图片资源
└── types/               # TypeScript 类型定义
```

## 贡献

欢迎贡献代码、报告问题或提出改进建议。请遵循以下步骤：

1. Fork 仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

MIT

---

## 联系方式

如有任何问题或建议，请通过以下方式联系我：

- 邮箱：your.email@example.com
- GitHub：[你的GitHub用户名](https://github.com/yourusername)
- 网站：[你的个人网站](https://yourwebsite.com)

感谢使用这个博客系统！ 