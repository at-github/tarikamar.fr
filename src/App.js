import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import './App.css';

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
  const page = data || '';

  if (isLoading) return 'Chargement en cours…'

  if (error) return 'Une erreur est survenue'

  return (
    <div className="App">
      <header className="App-header">
        <div dangerouslySetInnerHTML={{__html: page.content.rendered}} />
      </header>
    </div>
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
