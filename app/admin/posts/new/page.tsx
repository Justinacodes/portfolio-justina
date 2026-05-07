import PostForm from '@/app/admin/components/PostForm'

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">New Post</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <PostForm />
      </div>
    </div>
  )
}
