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

interface MediaInterface {
  guid: {
    rendered: string
  }
  , alt_text: string
}

function FeaturedImageWrapper(props: {
  fetched: MediaInterface
}) {
  const imgSrc = props.fetched.guid.rendered
  const imgAlt = props.fetched.alt_text

  return <div className="featured-image">
    <img src={imgSrc} alt={imgAlt}/>
  </div>
}

function FeaturedImage(props: {id: number}) {
  return useGetContent(FeaturedImageWrapper, `/wp/v2/media/${props.id}`)
}

export function Wrapper(props: {
    fetched: PostInterface
}) {
  const title = props.fetched.title.rendered
  const content = props.fetched.content.rendered
  const featuredMedia = props.fetched.featured_media

  return <BlogContainer>
    <Post
      title={title}
      content={content}
      featuredMedia={featuredMedia}
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
    , featuredMedia: number
    , children: JSX.Element
}) {
  return (
    <article>
      <h2>{props.title}</h2>
      <FeaturedImage id={props.featuredMedia}/>
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
