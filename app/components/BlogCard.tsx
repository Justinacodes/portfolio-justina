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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
        {post.coverImageUrl ? (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
            <span className="text-white text-5xl font-bold opacity-80">
              {post.title[0].toUpperCase()}
            </span>
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-500 text-sm flex-1 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          {post.publishedAt && (
            <time className="text-gray-400 text-xs mt-4 block">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </div>
    </Link>
  )
}
