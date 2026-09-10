import { prisma } from '@/app/lib/prisma'
import type { Metadata } from 'next'
import BlogCard from '@/app/components/BlogCard'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog · Justina Ominisan',
  description: 'Thoughts, tutorials, and insights on frontend and AI engineering.',
  alternates: { canonical: '/blog' },
}

function fetchPosts() {
  return prisma.post.findMany({
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
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof fetchPosts>> = []
  try {
    posts = await fetchPosts()
  } catch (error) {
    // A database outage shouldn't break the build or the page; show the
    // empty state instead.
    console.warn('[blog] Could not load posts:', error)
  }

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>
      <Header />

      <main id="main" className="bg-canvas pb-20 pt-28 sm:pb-24 sm:pt-36">
        <div className="shell">
          <div className="max-w-measure">
            <p className="meta">Writing</p>
            <h1 className="mt-5 font-display text-display-lg font-bold text-fg sm:mt-6">
              Blog
            </h1>
            <p className="mt-5 text-base text-subtle sm:mt-6 sm:text-lg">
              Thoughts, tutorials, and insights
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="mt-12 border-t border-line py-16 sm:mt-20 sm:py-24">
              <p className="text-base text-subtle sm:text-lg">
                No posts yet — check back soon!
              </p>
            </div>
          ) : (
            /* gap-px over a line-coloured bed draws hairline dividers between
               cards; on mobile the single column keeps them as horizontal rules. */
            <div className="mt-12 grid grid-cols-1 gap-px bg-line sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-16 border-t border-line pt-8 sm:mt-20">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 meta text-subtle transition-colors duration-300 hover:text-fg"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-editorial group-hover:-translate-x-1"
              >
                &#8592;
              </span>
              Back to portfolio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
