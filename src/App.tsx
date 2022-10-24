import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import Loading from './components/Loading';

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
            <form>
              <div className="form-row">
                <input type="email" placeholder="Votre email" />
              </div>
              <div className="form-row">
                <textarea
                  placeholder="Donnez moi une idée de l’aide dont vous avez besoin"
                  rows={4}
                  cols={45}
                />
              </div>
              <div className="form-row">
                <button type="submit" className="CTA">Contactez-moi</button>
              </div>
            </form>
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
