import {Link} from 'react-router-dom'
import useGetContent from '../../hooks/useGetContent'
import {PostInterface, Post} from './Post'

import BlogContainer from './BlogContainer'

import './Blog.css'

function Wrapper(props: {
  fetched: PostInterface[]
}) {
  const posts = props.fetched

  return (
    <BlogContainer>
      <>
        {posts.map((post: PostInterface) => {
          return <Post
            title={post.title.rendered}
            content={post.excerpt_read_more}
            featuredMedia={post.featured_media}
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

export default function PostsController() {
  return useGetContent(Wrapper, '/wp/v2/posts')
}
