import {
  ActionFunctionArgs
  , Link
  , LoaderFunctionArgs
  , useLoaderData
} from 'react-router-dom'

import BlogContainer from './BlogContainer'
import BackIcon from '../../components/Icons/BackIcon'

import { postContactWithSubject } from '../../services/postContactWithSubject'
import {get} from '../../services/api'

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

export async function postContactFromPostAction(
  {request}: ActionFunctionArgs
) {
  const [, slug] = window.location.href.split('.fr')

  return postContactWithSubject(
    await request.formData(),
    `À propos de l’article : ${slug}`
  )
}

export function getPost({params}: LoaderFunctionArgs) {
  return get(`/custom/v0/posts/${params.slug}`)
}

function FeaturedImage(props: {src: string, alt: string}) {
  return <div className="featured-image">
    <img src={props.src} alt={props.alt} />
  </div>
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
