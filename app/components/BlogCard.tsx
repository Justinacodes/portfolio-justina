import Link from 'next/link'
import Image from 'next/image'

interface PostSummary {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImageUrl: string | null
  publishedAt: Date | null
}

export default function BlogCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col bg-canvas px-0 py-6 transition-colors duration-500 sm:p-6 sm:hover:bg-surface">
        {post.coverImageUrl ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] w-full shrink-0 items-center justify-center rounded-lg border border-line bg-surface">
            <span
              className="font-display text-4xl font-bold text-fg/20 sm:text-5xl"
              aria-hidden="true"
            >
              {post.title[0].toUpperCase()}
            </span>
          </div>
        )}

        <div className="mt-5 flex flex-1 flex-col sm:mt-6">
          <h2 className="font-display text-lg font-bold leading-snug text-fg transition-colors duration-300 group-hover:text-accent sm:text-xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-subtle line-clamp-3">
              {post.excerpt}
            </p>
          )}
          {post.publishedAt && (
            <time
              dateTime={new Date(post.publishedAt).toISOString()}
              className="mt-5 block meta text-subtle sm:mt-6"
            >
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </article>
    </Link>
  )
}
