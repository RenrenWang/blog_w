import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于 | 个人博客",
  description: "了解更多关于我和这个博客的信息",
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            关于我
          </h1>
          <div className="relative mx-auto h-60 w-60 overflow-hidden rounded-full">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="个人照片"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 240px"
            />
          </div>
          <div className="space-y-4">
            <p>
              你好！我是这个博客的作者。我是一名热爱技术和写作的开发者，通过这个博客，我希望能够分享我的知识和经验，同时也记录自己的成长历程。
            </p>
            <p>
              我的专业领域包括Web开发、人工智能和数据科学。在这个博客中，你将看到我关于这些主题的文章，以及一些生活感悟和读书笔记。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">关于这个博客</h2>
          <div className="space-y-4">
            <p>
              这个博客使用Next.js构建，采用了现代的Web技术，包括React、TypeScript和Tailwind CSS。博客的设计注重简洁、易读性和用户体验。
            </p>
            <p>
              我创建这个博客的目的是为了分享知识、记录思考，并与志同道合的人建立联系。如果你对我的文章有任何问题或建议，欢迎通过以下方式联系我。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">联系方式</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>邮箱：</strong> example@example.com
            </li>
            <li>
              <strong>GitHub：</strong>{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                github.com/username
              </a>
            </li>
            <li>
              <strong>Twitter：</strong>{" "}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                twitter.com/username
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 