"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { IComment } from "@/models/Comment"

interface CommentListProps {
  postId: string
  refreshKey: number
}

export function CommentList({ postId, refreshKey }: CommentListProps) {
  const [comments, setComments] = useState<IComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      setError("")
      try {
        const response = await fetch(`/api/comments?postId=${postId}`)
        if (!response.ok) {
          throw new Error("获取评论失败")
        }
        const data = await response.json()
        setComments(data)
      } catch (err: any) {
        setError(err.message || "加载评论时出错")
        console.error("Error fetching comments:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [postId, refreshKey])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <svg 
            className="h-8 w-8 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span>加载评论中...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="my-8 rounded-md bg-destructive/10 p-6 text-center text-destructive">
        <div className="flex flex-col items-center gap-2">
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
            className="h-6 w-6"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="my-12 rounded-lg border border-dashed bg-muted/40 p-12 text-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
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
            className="h-12 w-12"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-lg font-medium">暂无评论</p>
          <p>成为第一个评论的人吧！</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">评论 ({comments.length})</h3>
      </div>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-lg font-semibold">{comment.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div className="font-medium">{comment.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(comment.createdAt), "yyyy年MM月dd日 HH:mm")}
                  </div>
                </div>
              </div>
            </div>
            <div className="prose-sm prose-stone dark:prose-invert">
              <p className="text-card-foreground">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 