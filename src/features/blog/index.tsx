import BlogContainer from './BlogContainer'
import Posts from './Posts'
import {PostInterface} from './Post'
import {get} from '../../services/api'
import {useLoaderData} from 'react-router-dom'

export function getPosts() {
  return get('/wp/v2/posts')
}

export default function Blog() {
  const posts = useLoaderData() as PostInterface[]

  return <BlogContainer>
    <Posts posts={posts} />
  </BlogContainer>
}
