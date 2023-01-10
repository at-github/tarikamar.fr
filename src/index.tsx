import reportWebVitals from './reportWebVitals'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter
  , RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import Services, {
  getServices
  , postContactFromServicesAction
} from './features/services'
import Posts, {
  getPosts,
  postContactFromPostsAction
} from './features/blog/Posts'
import Post, {
  getPost
  , postContactFromPostAction
} from './features/blog/Post'
import CV, {
  getCV
  , postContactFromCVAction
} from './features/cv'
import ErrorPage from './features/errorpage'

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
        , action: postContactFromServicesAction
      }
      , {
        path: '/blog'
        , element: <Posts />
        , loader: getPosts
        , action: postContactFromPostsAction
      }
      , {
        path: '/blog/:slug'
        , element: <Post />
        , loader: getPost
        , action: postContactFromPostAction
      }
      , {
        path: '/cv'
        , element: <CV />
        , loader: getCV
        , action: postContactFromCVAction
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
