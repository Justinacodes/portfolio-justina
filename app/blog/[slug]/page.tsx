import { prisma } from '@/app/lib/prisma'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true, coverImageUrl: true },
  })
  if (!post) return {}

  const description = post.excerpt ?? undefined
  return {
    title: `${post.title} · Justina Ominisan`,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `/blog/${slug}`,
      type: 'article',
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
    twitter: { card: 'summary_large_image', title: post.title, description },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  })

  if (!post) notFound()

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
        <article className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 meta text-subtle transition-colors duration-300 hover:text-fg"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-editorial group-hover:-translate-x-1"
            >
              &#8592;
            </span>
            Back to blog
          </Link>

          <header className="mt-8 sm:mt-10">
            {post.publishedAt && (
              <time
                dateTime={new Date(post.publishedAt).toISOString()}
                className="meta text-accent"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            <h1 className="mt-4 font-display text-display-lg font-bold text-fg sm:mt-5">
              {post.title}
            </h1>
          </header>

          {post.coverImageUrl && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line sm:mt-12">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {post.excerpt && (
            <p className="mt-8 border-l border-accent pl-4 text-base text-fg/80 sm:mt-12 sm:pl-5 sm:text-lg">
              {post.excerpt}
            </p>
          )}

          {/* break-words stops long URLs or code tokens from forcing the page
              to scroll sideways on narrow screens. */}
          <div className="mt-8 whitespace-pre-wrap break-words border-t border-line pt-8 text-base leading-relaxed text-fg/80 sm:mt-12 sm:pt-12 sm:text-lg">
            {post.content}
          </div>

          <div className="mt-16 border-t border-line pt-8 sm:mt-20">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 meta text-subtle transition-colors duration-300 hover:text-fg"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-editorial group-hover:-translate-x-1"
              >
                &#8592;
              </span>
              All posts
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
