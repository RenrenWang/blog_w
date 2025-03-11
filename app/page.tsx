import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { getSortedPostsMetadata } from "@/lib/blog"
import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "个人博客 | 分享我的想法和经验",
  description: "这是我的个人博客，分享我的想法、经验和知识。",
  openGraph: {
    title: "个人博客 | 分享我的想法和经验",
    description: "这是我的个人博客，分享我的想法、经验和知识。",
    type: "website",
  },
}

export default async function Home() {
  const recentPosts = (await getSortedPostsMetadata()).slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* 英雄区域 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                欢迎来到我的个人博客
              </h1>
              <p className="text-muted-foreground md:text-xl">
                这里是我分享想法、经验和知识的地方。探索我的文章，了解更多关于技术、生活和创意的内容。
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/blog">
                  <Button size="lg">浏览文章</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">了解我</Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                alt="博客封面图"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">最新文章</h2>
              <p className="text-muted-foreground md:text-xl">
                探索我最近发布的内容
              </p>
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/blog">
              <Button variant="outline" size="lg">查看所有文章</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 关于我 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mx-auto lg:mx-0 relative aspect-square w-full max-w-sm overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="个人照片"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">关于我</h2>
              <p className="text-muted-foreground md:text-xl">
                我是一名热爱技术和创意的开发者，喜欢探索新技术并分享我的经验。
                通过这个博客，我希望能够记录我的学习历程，并与更多志同道合的人交流。
              </p>
              <div>
                <Link href="/about">
                  <Button variant="outline">了解更多</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 