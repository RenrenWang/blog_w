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
      <article className="container py-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-1"
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

          <div className="space-y-4">
            <h1 className="inline-block text-3xl font-bold leading-tight lg:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {format(new Date(post.date), "yyyy年MM月dd日")}
              </time>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {post.coverImage && (
            <div className="relative my-8 aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div
            className="prose prose-stone mx-auto dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* 评论区 */}
          <Comments postId={post.id} />
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
} 