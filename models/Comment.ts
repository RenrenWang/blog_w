import mongoose, { Schema, models } from 'mongoose'

export interface IComment {
  _id?: string
  postId: string
  name: string
  email: string
  content: string
  createdAt: Date
}

const commentSchema = new Schema<IComment>(
  {
    postId: {
      type: String,
      required: [true, '文章ID是必需的'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, '名称是必需的'],
      trim: true,
      maxlength: [50, '名称不能超过50个字符'],
    },
    email: {
      type: String,
      required: [true, '邮箱是必需的'],
      trim: true,
      maxlength: [100, '邮箱不能超过100个字符'],
    },
    content: {
      type: String,
      required: [true, '评论内容是必需的'],
      trim: true,
      maxlength: [1000, '评论内容不能超过1000个字符'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// 如果模型已经存在，则使用现有模型，否则创建新模型
const Comment = models.Comment || mongoose.model<IComment>('Comment', commentSchema)

export default Comment 