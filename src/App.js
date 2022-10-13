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
    const result = fetchData();
    console.log(result);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>WIP - Landing page soon</p>
        <pre>{JSON.stringify(page)}</pre>
      </header>
    </div>
  );
}

export default App;
