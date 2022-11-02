import {Outlet} from 'react-router-dom';
import Menu from '../Menu';
import Footer from '../Footer';

import './Layout.css';

export default function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  )
}
