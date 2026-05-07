import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import PostForm from '@/app/admin/components/PostForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Post</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <PostForm
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImageUrl: post.coverImageUrl,
            published: post.published,
          }}
        />
      </div>
    </div>
  )
}
