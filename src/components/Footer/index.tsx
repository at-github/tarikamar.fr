import {HashLink} from 'react-router-hash-link';

import ArrowUpIcon from '../Icons/ArrowUpIcon'

import './Footer.css';

export default function Footer(props: {
  scrollTopVisible: Boolean
}) {
  return (
    <div id="footer">
      <HashLink
        to={'/#menu'}
        id="scroll-top"
        className={`button ${props.scrollTopVisible ? 'visible' : 'hide'}`}
      >
        <ArrowUpIcon />
      </HashLink>
    </div>
  )
}
