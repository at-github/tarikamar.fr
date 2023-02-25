import {ActionFunctionArgs, useLoaderData} from 'react-router-dom'

import Contact from '../../components/Contact'

import {get} from '../../services/api'
import {postContactWithSubject} from '../../services/postContactWithSubject'

import './Services.css'

interface APIServicesResponse {
  content: {
    rendered: string
  }
}

export function getServices() {
  return get('/wp/v2/pages/5')
}

export async function postContactFromServicesAction(
  {request}: ActionFunctionArgs
) {
  return postContactWithSubject(
    await request.formData(),
    'Concernant vos services'
  )
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
          <Contact messagePlaceholder="Donnez moi une idée de l’aide dont vous avez besoin" />
        </div>
      </div>
    </div>
  )
}
