"use client"

import { useState } from "react"
import { CommentForm } from "@/components/comment-form"
import { CommentList } from "@/components/comment-list"

interface CommentsProps {
  postId: string
}

export function Comments({ postId }: CommentsProps) {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleCommentAdded = () => {
    // 增加refreshKey触发评论列表重新加载
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="mb-8 text-2xl font-bold">评论区</h2>
      <CommentList postId={postId} refreshKey={refreshKey} />
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </div>
  )
} 