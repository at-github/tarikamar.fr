import {useState} from 'react'
import useGetContent from '../../hooks/useGetContent'
import LoadingIcon from '../../components/Icons/LoadingIcon'

import './Blog.css'

interface PostInterface {
  id: number
  , content: {
      rendered: string
    }
  , title: {
    rendered: string
  }
  , excerpt_read_more: string
}

function Wrapper(props: {
  fetched: PostInterface[]
}) {
  const posts = props.fetched
  const [list, setList] = useState(true)
  const [post, setPost] = useState<PostInterface | undefined>()

  function BlogController () {
    if (list === true)
      return <Posts />

    if (list === false && typeof post !== 'undefined')
      return <Post
        id={post.id}
        title={post.title.rendered}
        content={post.content.rendered}
      >
        <button
          onClick={handleBackToBlog}
        >back</button>
      </Post>

    return <LoadingIcon />
  }

  function handleReadMore(e: React.MouseEvent<HTMLButtonElement>) {
    const id = Number(e?.currentTarget?.dataset?.id || '')
    if (id === 0)
      return

    const post = posts.filter((item) => item.id === id)
    if (post.length !== 1)
      return

    setList(false)
    setPost(post[0])
  }

  function handleBackToBlog() {
    setList(true)
  }

  function Post(props: {
      id: number
      , title: string
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

  function Posts() {
    return (
      <>
        {posts.map((post: PostInterface) => {
          return (
            <Post
              id={post.id}
              key={post.id}
              title={post.title.rendered}
              content={post.excerpt_read_more}
            >
              <button
                className="CTA read-more"
                title="Lire la suite de l'article"
                onClick={handleReadMore}
                data-id={post.id}
              >…</button>
            </Post>
          )
        })}
      </>
    );
  }

  return (
    <div className="content blog">
      <header>
        <h1>Blog</h1>
      </header>
      <BlogController />
    </div>
  )
}

export default function Blog() {
  return useGetContent(Wrapper, '/wp/v2/posts')
}
