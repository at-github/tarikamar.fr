import {useLoaderData} from 'react-router-dom'

import {get} from '../../services/api'
import Contact from '../../components/Contact'

import './Services.css'

interface APIServicesResponse {
  content: {
    rendered: string
  }
}

export function getServices() {
  return get('/wp/v2/pages/5')
}

export default function Services() {
  const page = useLoaderData() as APIServicesResponse

  return (
    <div className="content services">
      <div
        className="editorial"
        dangerouslySetInnerHTML={{
          __html: page.content.rendered
        }}
      />
      <div className="big-row contact">
        <div>
          <h1>Intéressé ?</h1>
          <Contact />
        </div>
      </div>
    </div>
  )
}
