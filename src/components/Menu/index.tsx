import {NavLink} from 'react-router-dom';

import './Menu.css';

export default function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li><NavLink to={'/'}>Services</NavLink></li>
        <li><NavLink to={'/blog'}>Blog</NavLink></li>
      </ul>
    </nav>
  )
}
