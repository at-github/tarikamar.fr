import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import Loading from './components/Loading';
import Contact from './components/Contact';

import './App.css';

interface ResponseInterface {
  content: {
    rendered: string
  }
}

const queryClient = new QueryClient()

function Content() {
  const {isLoading, error, data} = useQuery('servicesData', () =>
    fetch(
      'https://api.tarikamar.fr/wp-json/wp/v2/pages/5'
      , {
        credentials: 'include'
        , mode: 'cors'
      }
    ).then(res => res.json())
  )
  const page: ResponseInterface = data || '';

  if (isLoading) return <Loading />;

  if (error) return <>'Une erreur est survenue'</>

  return (
    <>
      <div className="App">
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App;
