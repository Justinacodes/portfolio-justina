import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  })

  if (!post) notFound()

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="text-indigo-600 hover:text-indigo-700 font-medium mb-8 inline-block transition-colors"
        >
          ← Back to Blog
        </Link>

        {post.coverImageUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          {post.publishedAt && (
            <time className="text-gray-500 text-sm">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </header>

        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-8 pb-8 border-b border-gray-200 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
          {post.content}
        </div>
      </article>
    </main>
  )
}
