import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import myFetch from '../../services/myFetch'
import Contact from '../../components/Contact'

import LoadingIcon from '../../components/Icons/LoadingIcon'

import './Services.css';

const queryClient = new QueryClient()

function Content() {
  const {isLoading, error, data} = useQuery('servicesData', () =>
    myFetch('/wp/v2/pages/5')
  )
  const page = data || {content: {rendered: ''}}

  if (isLoading) return <LoadingIcon />;

  if (error) return <>'Une erreur est survenue'</>

  return (
    <>
      <div className="content">
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
