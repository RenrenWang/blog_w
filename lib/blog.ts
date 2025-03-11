import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), '_posts')

export interface PostMetadata {
  id: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  tags: string[]
}

export interface Post extends PostMetadata {
  content: string
  rawContent: string
}

export function getSortedPostsMetadata(): PostMetadata[] {
  // 获取_posts目录下的所有文件名
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // 从文件名中移除".md"以获取id
    const id = fileName.replace(/\.md$/, '')

    // 读取markdown文件作为字符串
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 使用gray-matter解析文章元数据
    const matterResult = matter(fileContents)

    // 合并数据与id
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt || '',
      coverImage: matterResult.data.coverImage || '/images/default-cover.jpg',
      tags: matterResult.data.tags || [],
    } as PostMetadata
  })

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用gray-matter解析文章元数据
  const matterResult = matter(fileContents)

  // 使用remark将markdown转换为HTML字符串
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const content = processedContent.toString()

  // 合并数据与id和内容
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt || '',
    coverImage: matterResult.data.coverImage || '/images/default-cover.jpg',
    tags: matterResult.data.tags || [],
    content,
    rawContent: matterResult.content,
  }
} 