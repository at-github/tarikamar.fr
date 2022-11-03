import {HashLink} from 'react-router-hash-link';

import './Footer.css';

function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="50"
      height="50"
      viewBox="-3 -2 30 30"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <div id="footer">
      <HashLink
        to={'/#menu'}
        id="scroll-top"
        className="button"
      >
        <ArrowUp />
      </HashLink>
    </div>
  )
}
