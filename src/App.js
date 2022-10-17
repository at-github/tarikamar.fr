import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      return await fetch(
        'https://api.tarikamar.fr/wp-json/wp/v2/pages/5'
        , {
          credentials: 'include'
          , mode: 'cors'
        }
      ).then(res => res.json())
      .then(page => setPage(page))
    }
    fetchData();
  }, [])

  if (!page || !page.content || !page.content.rendered)
    return (<>Patientez pendant le chargement</>);

  return (
    <div className="App">
      <header className="App-header">
        <div dangerouslySetInnerHTML={{__html: page.content.rendered}} />
      </header>
    </div>
  );
}

export default App;
