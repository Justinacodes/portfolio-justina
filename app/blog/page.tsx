import { prisma } from '@/app/lib/prisma'
import BlogCard from '@/app/components/BlogCard'
import Link from 'next/link'

export const revalidate = 60

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImageUrl: true,
      publishedAt: true,
    },
  })

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-500 text-lg">Thoughts, tutorials, and insights</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-xl">No posts yet — check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
