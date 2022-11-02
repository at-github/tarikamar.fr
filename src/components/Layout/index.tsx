import {Outlet} from 'react-router-dom';
import Menu from '../Menu';

import './Layout.css';

export default function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
}
