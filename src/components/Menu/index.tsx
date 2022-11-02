import {NavLink} from 'react-router-dom';
import {NavHashLink} from 'react-router-hash-link';

import './Menu.css';

export default function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li><NavLink to={'/'}>Services</NavLink></li>
        <li><NavLink to={'/blog'}>Blog</NavLink></li>
        <li>
          <NavHashLink to={'/services/#contact'}>
            Concatez-moi
          </NavHashLink>
        </li>
      </ul>
    </nav>
  )
}
