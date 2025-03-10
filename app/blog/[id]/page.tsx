import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAllPostIds, getPostData } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { Comments } from "@/components/comments"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostData(params.id)
    return {
      title: `${post.title} | 个人博客`,
      description: post.excerpt,
    }
  } catch (error) {
    return {
      title: "文章不存在 | 个人博客",
      description: "找不到请求的文章",
    }
  }
}

export async function generateStaticParams() {
  const posts = getAllPostIds()
  return posts
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPostData(params.id)

    return (
      <div className="bg-background">
        {/* 文章封面图 - 全宽显示 */}
        {post.coverImage && (
          <div className="relative h-[40vh] w-full overflow-hidden sm:h-[50vh] md:h-[60vh]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>
        )}

        <div className="container relative">
          {/* 返回按钮 */}
          <div className="py-6">
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/blog">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                返回文章列表
              </Link>
            </Button>
          </div>

          {/* 文章内容区 */}
          <article className="mx-auto max-w-3xl pb-16">
            {/* 文章标题和元数据 */}
            <header className={`mb-10 ${post.coverImage ? "-mt-20 relative z-10 bg-background p-6 rounded-t-xl shadow-sm" : ""}`}>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.date} className="flex items-center gap-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="h-4 w-4"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    {format(new Date(post.date), "yyyy年MM月dd日")}
                  </time>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            {/* 文章正文 */}
            <div
              className="prose prose-lg prose-stone mx-auto max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* 文章底部 */}
            <div className="mt-16 flex justify-center border-t pt-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-4 w-4"
                >
                  <line x1="19" x2="5" y1="12" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                浏览更多文章
              </Link>
            </div>
          </article>

          {/* 评论区 */}
          <div className="mx-auto max-w-3xl border-t">
            <Comments postId={post.id} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
} 