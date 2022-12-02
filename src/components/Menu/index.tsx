import {useState, forwardRef} from 'react'
import {NavLink} from 'react-router-dom'
import {NavHashLink} from 'react-router-hash-link'

import MenuIcon from '../Icons/MenuIcon'
import CloseIcon from '../Icons/CloseIcon'

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
        ><CloseIcon /></button>

        <button
          className={`open${open ? ' is-closed': ''}`}
          onClick={handleOpen}
        >
          <MenuIcon />
        </button>

        <ul
          className={`${!open ? 'is-closed' : ''}`}
          onClick={handleClickOutside}
        >
          <li><NavLink to={'/'}>Services</NavLink></li>
          <li><NavLink to={'/blog'}>Blog</NavLink></li>
          <li><NavLink to={'/cv'}>CV</NavLink></li>
          <li>
            <NavHashLink
              to={'#contact'}
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
