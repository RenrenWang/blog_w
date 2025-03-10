import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-200px)] flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          404 - 页面未找到
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          抱歉，您请求的页面不存在。
        </p>
        <Button asChild className="mt-8">
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </div>
  )
} 