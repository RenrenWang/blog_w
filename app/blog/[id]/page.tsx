import { notFound } from "next/navigation"
import Image from "next/image"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Metadata } from 'next'

import { getPostData, getSortedPostsMetadata } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Comments } from "@/components/comments"
import { PageProps } from 'next/dist/server/app-render/entry-base'

// 生成静态路径参数
export async function generateStaticParams() {
  const posts = await getSortedPostsMetadata()
  
  return posts.map((post) => ({
    id: post.id,
  }))
}

// 生成动态元数据
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolvedParams = await props.params
  // 如果需要使用 searchParams，也需要 await
  // const resolvedSearchParams = props.searchParams ? await props.searchParams : undefined
  
  const post = await getPostData(resolvedParams.id)
  
  if (!post) {
    return {
      title: '文章未找到',
      description: '请求的文章不存在'
    }
  }
  
  return {
    title: `${post.title} | 个人博客`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

// 直接使用 HTML 内容，但替换代码块为高亮组件
export default async function BlogPost(props: PageProps) {
  const resolvedParams = await props.params
  // 如果需要使用 searchParams，也需要 await
  // const resolvedSearchParams = props.searchParams ? await props.searchParams : undefined
  
  const post = await getPostData(resolvedParams.id)
  
  if (!post) {
    notFound()
  }
  
  // 处理原始 Markdown 中的代码块
  const processedContent = processCodeBlocks(post.content, post.rawContent)
  
  return (
    <article className="container max-w-3xl py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
          {post.title}
        </h1>
        <div className="text-foreground/80">
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
        </div>
      </div>
      
      {post.coverImage && (
        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <Image
            src={post.coverImage}
            alt={post.title || "博客封面"}
            width={1200}
            height={675}
            className="object-cover w-full"
            priority
          />
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
        {processedContent}
      </div>
      
      {/* 添加评论组件 */}
      <Comments postId={resolvedParams.id} />
    </article>
  )
}

// 处理代码块的函数
function processCodeBlocks(htmlContent: string, rawContent: string) {
  // 从原始 Markdown 中提取代码块
  const codeBlocks: Array<{language: string, code: string}> = []
  const codeBlockRegex = /```([\w-]*)\n([\s\S]*?)```/g
  let match
  
  while ((match = codeBlockRegex.exec(rawContent)) !== null) {
    codeBlocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    })
  }
  
  // 如果没有找到代码块，直接返回 HTML 内容
  if (codeBlocks.length === 0) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  }
  
  // 在 HTML 中查找 <pre><code> 标签并替换为 SyntaxHighlighter
  const parts = []
  const preRegex = /<pre><code(?:\s+class="language-([\w-]*)")?>([^<]*)<\/code><\/pre>/g
  let lastIndex = 0
  let preMatch
  let blockIndex = 0
  
  while ((preMatch = preRegex.exec(htmlContent)) !== null && blockIndex < codeBlocks.length) {
    // 添加代码块前的内容
    if (preMatch.index > lastIndex) {
      parts.push(
        <div 
          key={`html-${lastIndex}`} 
          dangerouslySetInnerHTML={{ 
            __html: htmlContent.slice(lastIndex, preMatch.index) 
          }} 
        />
      )
    }
    
    // 添加代码高亮块
    const codeBlock = codeBlocks[blockIndex]
    parts.push(
      <div key={`code-${blockIndex}`} className="my-6 rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-[#282c34] text-gray-200 text-sm">
          <span>{codeBlock.language || 'text'}</span>
        </div>
        <SyntaxHighlighter
          language={codeBlock.language || 'text'}
          style={oneDark}
          showLineNumbers={true}
          wrapLines={true}
          customStyle={{
            borderRadius: '0',
            fontSize: '0.95rem',
            margin: 0,
            backgroundColor: '#1a1b26', // 更深的背景色
          }}
          lineNumberStyle={{
            color: '#8b949e', // 更亮的行号颜色
            opacity: 0.8,
            paddingRight: '1em',
            textAlign: 'right',
            minWidth: '3em',
            borderRight: '1px solid #30363d',
            marginRight: '1em',
          }}
          codeTagProps={{
            style: {
              fontSize: '0.95rem',
              fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
            }
          }}
        >
          {codeBlock.code}
        </SyntaxHighlighter>
      </div>
    )
    
    lastIndex = preMatch.index + preMatch[0].length
    blockIndex++
  }
  
  // 添加最后一部分内容
  if (lastIndex < htmlContent.length) {
    parts.push(
      <div 
        key={`html-${lastIndex}`} 
        dangerouslySetInnerHTML={{ 
          __html: htmlContent.slice(lastIndex) 
        }} 
      />
    )
  }
  
  return <>{parts}</>
} 