/// <reference types="next" />

// 扩展 Next.js 的类型定义
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly MONGODB_URI: string
  }
}

// 修复 Next.js 15 中的类型问题
declare module 'next/dist/server/app-render/entry-base' {
  export interface PageProps {
    params: {
      [key: string]: string
    }
    searchParams?: {
      [key: string]: string | string[] | undefined
    }
  }
} 