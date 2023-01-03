import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom'
import Layout from './components/Layout'
import Services from './features/services'
import PostsController from './features/blog/Posts'
import PostController from './features/blog/Post'
import CVController from './features/cv'
import NotFound from './features/notfound'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Services />} />
        <Route path="services" element={<Services />} />
        <Route path="blog" element={<PostsController />} />
        <Route path="blog/:slug" element={<PostController />} />
        <Route path="cv" element={<CVController />} />
        <Route path="*" element={<NotFound />} />
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
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log)
