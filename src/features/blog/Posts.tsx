import {ActionFunctionArgs, Link, useLoaderData} from 'react-router-dom'

import {PostInterface, PostComponent} from './Post'
import BlogContainer from './BlogContainer'

import {postContactWithSubject} from '../../services/postContactWithSubject'
import {get} from '../../services/api'

import './Blog.css'

export function getPosts() {
  return get('/wp/v2/posts')
}

export async function postContactFromPostsAction(
  {request}: ActionFunctionArgs
) {
  return postContactWithSubject(
    await request.formData(),
    'Concernant le blog'
  )
}

export default function Posts() {
  const posts = useLoaderData() as PostInterface[]

  return (
    <BlogContainer>
      <>
        {posts.map((post: PostInterface) => {
          return <PostComponent
            title={post.title.rendered}
            content={post.excerpt_read_more}
            featuredMediaUrl={post.featured_media_url}
            key={post.id}
          >
            <Link
              className="read-more"
              to={`/blog/${post.slug}`}
            >…</Link>
          </PostComponent>
        })}
      </>
    </BlogContainer>
  )
}
