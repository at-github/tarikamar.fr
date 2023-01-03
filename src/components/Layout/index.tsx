import {useRef} from 'react'
import {Outlet} from 'react-router-dom'
import Menu from '../Menu'
import Footer from '../Footer'
import  useIntersectionObserver from '../../hooks/useIntersectionObserver'

import './Layout.css'

export default function Layout() {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  let menuVisible = true
  if (typeof entry?.isIntersecting !== 'undefined')
    menuVisible = entry.isIntersecting

  return (
    <>
      <Menu ref={ref}/>
      <Outlet />
      <Footer scrollTopVisible={!menuVisible}/>
    </>
  )
}
