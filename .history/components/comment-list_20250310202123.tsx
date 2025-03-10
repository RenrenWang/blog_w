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
    return <div className="mt-8 text-center">加载评论中...</div>
  }

  if (error) {
    return (
      <div className="mt-8 rounded-md bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="mt-8 text-center text-muted-foreground">
        暂无评论，成为第一个评论的人吧！
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-bold">评论 ({comments.length})</h3>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="rounded-lg border border-border bg-card p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium">{comment.name}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(comment.createdAt), "yyyy年MM月dd日 HH:mm")}
              </div>
            </div>
            <p className="text-card-foreground">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 