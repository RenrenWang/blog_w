import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getSortedPostsMetadata } from "@/lib/blog"
import { PostCard } from "@/components/post-card"

export default function Home() {
  const recentPosts = getSortedPostsMetadata().slice(0, 3)

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
                这里记录我的思考、学习和生活。通过文字，我们可以连接思想，分享知识，共同成长。
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/blog">
                    浏览文章
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">
                    了解更多
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover">
              <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                alt="工作桌面"
                width={600}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                最新文章
              </h2>
              <p className="text-muted-foreground md:text-xl">
                探索我最近发布的内容
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/blog">
                查看所有文章
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 关于我 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mx-auto aspect-square overflow-hidden rounded-full object-cover">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="个人照片"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                关于我
              </h2>
              <p className="text-muted-foreground md:text-xl">
                我是一名热爱技术和写作的开发者。通过这个博客，我希望能够分享我的知识和经验，同时也记录自己的成长历程。
              </p>
              <Button asChild>
                <Link href="/about">
                  了解更多
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 