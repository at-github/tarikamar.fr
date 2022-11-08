import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import myFetch from '../../services/myFetch'
import LoadingIcon from '../../components/Icons/LoadingIcon'

import './Blog.css'

const queryClient = new QueryClient()

interface PostInterface {
  content: string
  , title: {
    rendered: string
  }
  , excerpt_read_more: string
}

function Content() {
  const {isLoading, error, data} = useQuery('postsData', () =>
    myFetch('/wp/v2/posts')
  )
  const posts = data

  if (isLoading) return <LoadingIcon />;

  if (error) return <>'Une erreur est survenue'</>

  return (
    <>
      <div className="content blog">
        <header>
          <h1>Blog</h1>
        </header>
        {posts.map((post: PostInterface) => {
          return (
            <article>
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
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
