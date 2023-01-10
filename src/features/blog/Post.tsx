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
  , featured_media_url: string
  , excerpt_read_more: string
  , slug: string
}

function FeaturedImage(props: {src: string, alt: string}) {
  return <div className="featured-image">
    <img src={props.src} alt={props.alt} />
  </div>
}

export function getPost({params}: LoaderFunctionArgs) {
  return get(`/custom/v0/posts/${params.slug}`)
}

export default function Post() {
  const post             = useLoaderData() as PostInterface
  const title            = post.title.rendered
  const content          = post.content.rendered
  const featuredMediaUrl = post.featured_media_url

  return <BlogContainer>
    <PostComponent
      title={title}
      content={content}
      featuredMediaUrl={featuredMediaUrl}
    >
      <Link
        className="back"
        to={'/blog/'}
      ><BackIcon /></Link>
    </PostComponent>
  </BlogContainer>
}

export function PostComponent(props: {
    title: string
    , content: string
    , featuredMediaUrl: string
    , children: JSX.Element
}) {
  return (
    <article>
      <h2>{props.title}</h2>
      <FeaturedImage src={props.featuredMediaUrl} alt={props.title} />
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
