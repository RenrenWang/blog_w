import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} 个人博客. 保留所有权利.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/RenrenWang"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
} 