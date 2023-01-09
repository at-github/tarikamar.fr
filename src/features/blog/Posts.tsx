import {Link, useLoaderData} from 'react-router-dom'
import {PostInterface, Post} from './Post'
import {get} from '../../services/api'

import BlogContainer from './BlogContainer'

import './Blog.css'

export function getPosts() {
  return get('/wp/v2/posts')
}

export default function PostsController() {
  const posts = useLoaderData() as PostInterface[]

  return (
    <BlogContainer>
      <>
        {posts.map((post: PostInterface) => {
          return <Post
            title={post.title.rendered}
            content={post.excerpt_read_more}
            featuredMediaUrl={post.featured_media_url}
          >
            <Link
              className="read-more"
              to={`/blog/${post.slug}`}
            >…</Link>
          </Post>
        })}
      </>
    </BlogContainer>
  )
}
