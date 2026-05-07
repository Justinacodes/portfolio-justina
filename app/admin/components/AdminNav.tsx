'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <span className="font-bold text-indigo-600 text-lg">Blog Admin</span>
            <Link
              href="/admin/posts"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/admin/posts') && pathname !== '/admin/posts/new'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              All Posts
            </Link>
            <Link
              href="/admin/posts/new"
              className={`text-sm font-medium transition-colors ${
                pathname === '/admin/posts/new'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              + New Post
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              target="_blank"
              className="text-sm text-gray-400 hover:text-indigo-600 transition-colors"
            >
              View Blog ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
