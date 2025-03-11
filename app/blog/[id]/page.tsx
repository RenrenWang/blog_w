import { notFound } from "next/navigation"
import Image from "next/image"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { getPostData, getSortedPostsMetadata } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Comments } from "@/components/comments"

// 生成静态路径参数
export async function generateStaticParams() {
  const posts = getSortedPostsMetadata()
  
  return posts.map((post) => ({
    id: post.id,
  }))
}

// 直接使用 HTML 内容，但替换代码块为高亮组件
export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id)
  
  if (!post) {
    notFound()
  }
  
  // 处理原始 Markdown 中的代码块
  const processedContent = processCodeBlocks(post.content, post.rawContent)
  
  return (
    <article className="container max-w-3xl py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <div className="text-muted-foreground">
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
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {processedContent}
      </div>
      
      {/* 添加评论组件 */}
      <Comments postId={post.id} />
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
      <div key={`code-${blockIndex}`} className="my-6 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={codeBlock.language || 'text'}
          style={oneDark}
          showLineNumbers={true}
          wrapLines={true}
          customStyle={{
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            margin: 0,
          }}
          lineNumberStyle={{
            color: '#6b7280',
            opacity: 0.6,
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