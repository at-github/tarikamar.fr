import './Blog.css'
import {postContactWithSubject} from '../../services/postContactWithSubject'
import {ActionFunctionArgs} from 'react-router-dom'

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

function FeaturedImage(props: {src: string, alt: string}) {
  if (!props.src)
    return null

  return <div className="featured-image">
    <img src={props.src} alt={props.alt} />
  </div>
}

export default function Post(props: {
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
