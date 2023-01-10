import {useState, forwardRef} from 'react'
import {NavLink} from 'react-router-dom'

import MenuIcon from '../Icons/MenuIcon'
import CloseIcon from '../Icons/CloseIcon'

import './Menu.css'

const scrollToBottom = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  window.scrollTo(0, document.body.scrollHeight)
}

const Menu = forwardRef<HTMLDivElement>(
  (_, ref) => {
    const [open, setOpen] = useState(false)
    const handleClose = function() {
      setOpen(false)
    }

    const handleOpen = function() {
      setOpen(true)
    }

    const handleClickOutside = function() {
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
            <a
              href="#contact"
              onClick={scrollToBottom}
              className="CTA"
            >
              Concatez-moi
            </a>
          </li>
        </ul>
      </nav>
    )
  }
)

export default Menu
