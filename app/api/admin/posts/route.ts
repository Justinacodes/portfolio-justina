import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { createClient } from '@/app/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { title, slug, excerpt, content, coverImageUrl, published } = await request.json()

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImageUrl: coverImageUrl || null,
        published: !!published,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
