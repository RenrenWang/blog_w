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
    <div className="mt-16 py-8">
      <div className="mb-10 flex items-center justify-center">
        <div className="relative flex items-center">
          <div className="h-px w-16 bg-border"></div>
          <h2 className="mx-4 text-2xl font-bold">评论区</h2>
          <div className="h-px w-16 bg-border"></div>
        </div>
      </div>
      <CommentList postId={postId} refreshKey={refreshKey} />
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </div>
  )
} 