import ArrowUpIcon from '../Icons/ArrowUpIcon'

import './Footer.css'

const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  window.scrollTo(0, 0)
}

export default function Footer(props: {
  scrollTopVisible: Boolean
}) {
  return (
    <div id="footer">
      <a
        href={'#menu'}
        onClick={scrollToTop}
        id="scroll-top"
        className={`button ${props.scrollTopVisible ? 'visible' : 'hide'}`}
      >
        <ArrowUpIcon />
      </a>
    </div>
  )
}
