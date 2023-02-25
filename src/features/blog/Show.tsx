import {Link, LoaderFunctionArgs, useLoaderData} from 'react-router-dom'
import BackIcon from '../../components/Icons/BackIcon'
import {get} from '../../services/api'
import BlogContainer from './BlogContainer'
import Post, {PostInterface} from './Post'

export function getPost({params}: LoaderFunctionArgs) {
  return get(`/custom/v0/posts/${params.slug}`)
}

export default function ShowPost() {
  const post             = useLoaderData() as PostInterface
  const title            = post.title.rendered
  const content          = post.content.rendered
  const featuredMediaUrl = post.featured_media_url

  return <BlogContainer>
    <Post
      title={title}
      content={content}
      featuredMediaUrl={featuredMediaUrl}
    >
      <Link
        className="back"
        to={'/blog/'}
      ><BackIcon /></Link>
    </Post>
  </BlogContainer>
}
