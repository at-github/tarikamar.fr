import {Link, LoaderFunctionArgs, useLoaderData} from 'react-router-dom'

import BlogContainer from './BlogContainer'
import {get} from '../../services/api'

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

export function getPost({params}: LoaderFunctionArgs) {
  return get(`/custom/v0/posts/${params.slug}`)
}

export default function PostController() {
  const post          = useLoaderData() as PostInterface
  const title         = post.title.rendered
  const content       = post.content.rendered
  const featuredMedia = post.featured_media

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
