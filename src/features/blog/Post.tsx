import {Link} from 'react-router-dom'
import useGetContent from '../../hooks/useGetContent'

import BlogContainer from './BlogContainer'

import BackIcon from '../../components/Icons/BackIcon'

import './Blog.css'

export interface PostInterface {
  id: number
  , content: {
      rendered: string
    }
  , title: {
    rendered: string
  }
  , featured_media: number
  , excerpt_read_more: string
  , slug: string
}

export function Wrapper(props: {
    fetched: any
}) {
  const {title} = props.fetched
  const content = props.fetched.content.rendered

  return <BlogContainer>
    <Post
      title={title}
      content={content}
    >
      <Link
        className="back"
        to={'/blog/'}
      ><BackIcon /></Link>
    </Post>
  </BlogContainer>
}

export function Post(props: {
    title: string
    , content: string
    , children: JSX.Element
}) {
  return (
    <article>
      <h2>{props.title}</h2>
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html: props.content
        }}
      />
      <footer>
        {props.children}
      </footer>
    </article>
  )
}

export default function PostController() {
  return useGetContent(Wrapper, '/custom/v0/posts/lebioenvrac-fr')
}
