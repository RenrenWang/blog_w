import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mock'

// 定义连接缓存的类型
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 扩展 NodeJS.Global 接口
declare global {
  var mongoose: MongooseCache | undefined;
}

// 缓存连接，避免重复连接
let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

// 确保全局缓存存在
if (!global.mongoose) {
  global.mongoose = cached
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectToDatabase 