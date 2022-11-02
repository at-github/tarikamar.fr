import {Link} from 'react-router-dom';

export default function Menu() {
  return (
    <ul className="menu">
      <li><Link to={'/'}>Services</Link></li>
      <li><Link to={'/blog'}>Blog</Link></li>
    </ul>
  )
}
