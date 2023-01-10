import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter
  , RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import Services, {getServices} from './features/services'
import PostsController, {getPosts} from './features/blog/Posts'
import PostController, {getPost} from './features/blog/Post'
import CVController, {getCV} from './features/cv'
import {postContactAction} from './components/Contact'
import ErrorPage from './features/errorpage'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

const router = createBrowserRouter([
  {
    path: '/'
    , element: <Layout />
    , errorElement: <ErrorPage />
    , children: [
      {
        index: true
        , element: <Services />
        , loader: getServices
        , action: postContactAction
      }
      , {
        path: '/blog'
        , element: <PostsController />
        , loader: getPosts
      }
      , {
        path: '/blog/:slug'
        , element: <PostController />
        , loader: getPost
      }
      , {
        path: '/cv'
        , element: <CVController />
        , loader: getCV
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
