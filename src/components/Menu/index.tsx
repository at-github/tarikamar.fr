import {useState, forwardRef} from 'react';
import {NavLink} from 'react-router-dom';
import {NavHashLink} from 'react-router-hash-link';

import './Menu.css';


const Menu = forwardRef<HTMLDivElement>(
  (_, ref) => {
    const [open, setOpen] = useState(false)
    const handleClose = function(e: any) {
      setOpen(false)
    }

    const handleOpen = function(e: any) {
      setOpen(true)
    }

    const handleClickOutside = function(e: any) {
      setOpen(false)
    }

    return (
      <nav id="menu" ref={ref}>
        <button
          className={`close${!open ? ' is-closed' : ''}`}
          onClick={handleClose}
        >x</button>

        <button
          className={`open${open ? ' is-closed': ''}`}
          onClick={handleOpen}
        >
        |||
        </button>

        <ul
          className={`${!open ? 'is-closed' : ''}`}
          onClick={handleClickOutside}
        >
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
  }
)

export default Menu
