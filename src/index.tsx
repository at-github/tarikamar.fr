import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter
  , RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import Services, {getServices} from './features/services'
import PostsController from './features/blog/Posts'
import PostController from './features/blog/Post'
import CVController from './features/cv'
import NotFound from './features/notfound'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

const router = createBrowserRouter([
  {
    path: '/'
    , element: <Layout />
    , errorElement: <NotFound />
    , children: [
      {
        index: true
        , element: <Services />
        , loader: getServices
      }
      , {
        path: '/blog'
        , element: <PostsController />
      }
      , {
        path: '/blog/:slug'
        , element: <PostController />
      }
      , {
        path: '/cv'
        , element: <CVController />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log)
