import {Link} from 'react-router-dom';

import './Menu.css';

export default function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to={'/'}>Services</Link></li>
        <li><Link to={'/blog'}>Blog</Link></li>
      </ul>
    </nav>
  )
}
