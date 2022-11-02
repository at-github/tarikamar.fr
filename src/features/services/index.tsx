import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import myFetch from '../../services/myFetch'
import Loading from '../../components/Loading'
import Menu from '../../components/Menu'
import Contact from '../../components/Contact'

import './Services.css';

const queryClient = new QueryClient()

function Content() {
  const {isLoading, error, data} = useQuery('servicesData', () =>
    myFetch('/wp/v2/pages/5')
  )
  const page = data || {content: {rendered: ''}}

  if (isLoading) return <Loading />;

  if (error) return <>'Une erreur est survenue'</>

  return (
    <>
      <div className="Services">
        <Menu />
        <div
          className="editorial"
          dangerouslySetInnerHTML={{__html: page.content.rendered}}
        />
        <div className="big-row">
          <div>
            <h1>Intéressé ?</h1>
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}

function Services() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Services;
