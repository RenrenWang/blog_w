import { Metadata } from "next"

import { getSortedPostsMetadata } from "@/lib/blog"
import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "博客 | 个人博客",
  description: "浏览所有博客文章",
}

export default function BlogPage() {
  const posts = getSortedPostsMetadata()

  return (
    <div className="container py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            博客
          </h1>
          <p className="text-xl text-muted-foreground">
            探索我的思考、学习和经验分享
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">暂无文章</p>
      )}
    </div>
  )
} 