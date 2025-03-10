import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

import { PostMetadata } from "@/lib/blog"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PostCardProps {
  post: PostMetadata
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/blog/${post.id}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <CardHeader className="p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold leading-tight">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.date), "yyyy年MM月dd日")}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
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
        </CardFooter>
      </Link>
    </Card>
  )
} 