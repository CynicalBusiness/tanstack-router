import { Link, Outlet, createLazyRoute } from '@tanstack/solid-router'
import { useQuery } from '@tanstack/solid-query'
import { createMemo } from 'solid-js'
import { postsQueryOptions } from './posts'

export const Route = createLazyRoute('/posts')({
  component: PostsLayoutComponent,
})

function PostsLayoutComponent() {
  const postsQuery = useQuery(() => postsQueryOptions)

  const posts = createMemo(() => {
    if (postsQuery.data) {
      return postsQuery.data
    } else {
      return []
    }
  })

  return (
    <div class="p-2 flex gap-2">
      <ul class="list-disc pl-4">
        {[...posts(), { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
          (post) => {
            console
            return (
              <li class="whitespace-nowrap">
                <Link
                  to="/posts/$postId"
                  params={{
                    postId: post.id,
                  }}
                  class="block py-1 px-2 text-blue-600 hover:opacity-75"
                  activeProps={{ class: 'font-bold underline' }}
                >
                  <div>{post.title.substring(0, 20)}</div>
                </Link>
              </li>
            )
          },
        )}
      </ul>
      <Outlet />
    </div>
  )
}
