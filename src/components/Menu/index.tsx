import {forwardRef} from 'react';
import {NavLink} from 'react-router-dom';
import {NavHashLink} from 'react-router-hash-link';

import './Menu.css';

const Menu = forwardRef<HTMLDivElement>(
  (_, ref) => <nav id="menu" ref={ref}>
    <ul>
      <li><NavLink to={'/'}>Services</NavLink></li>
      <li><NavLink to={'/blog'}>Blog</NavLink></li>
      <li>
        <NavHashLink
          to={'/services/#contact'}
          className="CTA"
        >
          Concatez-moi
        </NavHashLink>
      </li>
    </ul>
  </nav>
)

export default Menu
