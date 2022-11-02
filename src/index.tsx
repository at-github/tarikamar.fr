import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';
import Layout from './Layout';
import Services from './features/services';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

function ErrorPage() {
  const error = useRouteError()
  // eslint-disable-next-line no-console
  console.error(error)

  return (
    <>Ooops</>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Services />} />
        <Route path="services" element={<Services />} />
      </Route>
    </Routes>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log);
