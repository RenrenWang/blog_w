import { NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Comment from "@/models/Comment"

// 获取评论
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json(
      { message: "缺少文章ID参数" },
      { status: 400 }
    )
  }

  try {
    await connectToDatabase()
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(comments)
  } catch (error) {
    console.error("获取评论失败:", error)
    return NextResponse.json(
      { message: "获取评论失败" },
      { status: 500 }
    )
  }
}

// 添加评论
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, name, email, content } = body

    // 验证必填字段
    if (!postId || !name || !email || !content) {
      return NextResponse.json(
        { message: "所有字段都是必填的" },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "请提供有效的邮箱地址" },
        { status: 400 }
      )
    }

    await connectToDatabase()
    const comment = new Comment({
      postId,
      name,
      email,
      content,
      createdAt: new Date(),
    })

    await comment.save()

    return NextResponse.json(
      { message: "评论添加成功", comment },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("添加评论失败:", error)
    return NextResponse.json(
      { message: error.message || "添加评论失败" },
      { status: 500 }
    )
  }
} 