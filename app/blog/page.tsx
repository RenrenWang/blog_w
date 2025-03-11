import type { Metadata } from "next"

import { getSortedPostsMetadata } from "@/lib/blog"
import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "博客 | 个人博客",
  description: "浏览所有博客文章",
  openGraph: {
    title: "博客 | 个人博客",
    description: "浏览所有博客文章",
    type: "website",
  },
}

export default async function BlogPage() {
  const posts = await getSortedPostsMetadata()

  return (
    <div className="container py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            博客
          </h1>
          <p className="text-xl text-muted-foreground">
            分享我的想法、经验和知识
          </p>
        </div>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
} 