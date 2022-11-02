import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import Services from './features/services';
import Menu from './components/Menu';
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

const router = createBrowserRouter([
  {
    path: '/'
    , element: <Services />
    , errorElement: <ErrorPage />
  }, {
    path: '/services'
    , element: <Services />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log);
