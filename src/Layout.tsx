import {Outlet} from 'react-router-dom';
import Menu from './components/Menu';

export default function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
}
