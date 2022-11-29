import useGetContent from '../../hooks/useGetContent'
import {ExperienceInterface, Experience} from './Experience'

import CVContainer from './CVContainer'

import './CV.css'

function Wrapper(props: {
  fetched: ExperienceInterface[]
}) {
  const experiences = props.fetched

  return (
    <CVContainer>
      <>
        {experiences.map((xp: ExperienceInterface) => {
          return <Experience
            title={xp.title.rendered}
            content={xp.content.rendered}
            company={xp.custom_fields.company}
            location={xp.custom_fields.location}
            period={xp.custom_fields.period}
          />
        })}
      </>
    </CVContainer>
  )
}

export default function ExperiencesController() {
  return useGetContent(Wrapper, '/xp/experience')
}
