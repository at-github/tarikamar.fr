import useGetContent from '../../hooks/useGetContent'

import './Blog.css'

interface PostInterface {
  id: number
  , content: string
  , title: {
    rendered: string
  }
  , excerpt_read_more: string
}

function Wrapper(props: {
  fetched: PostInterface[]
}) {
  const posts = props.fetched

  return (
    <>
      <div className="content blog">
        <header>
          <h1>Blog</h1>
        </header>
        {posts.map((post: PostInterface) => {
          return (
            <article key={post.id}>
              <h2>{post.title.rendered}</h2>
              <div
                className="editorial"
                dangerouslySetInnerHTML={{__html: post.excerpt_read_more}}
              />
              <button
                className="CTA read-more"
                title="Lire la suite de l'article"
              >…</button>
            </article>
          )
        })}
      </div>
    </>
  );
}

export default function Blog() {
  return useGetContent(Wrapper, '/wp/v2/posts')
}
