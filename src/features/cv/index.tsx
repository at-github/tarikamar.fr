import useGetContent from '../../hooks/useGetContent'
import {ExperienceInterface, Experience} from './Experience'
import {FormationInterface, Formation} from './Formation'

import CVContainer from './CVContainer'

import './CV.css'

function ExperienceWrapper(props: {
  fetched: ExperienceInterface[]
}) {
  const experiences = props.fetched

  return (
    <>
      <h2>💻Expériences</h2>
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
  )
}

function FormationWrapper(props: {
  fetched: FormationInterface[]
}) {
  const formations = props.fetched

  return (
    <>
      <h2>🎓 Formations</h2>
      {formations.map((formation: any) => {
        return <Formation
          title={formation.title.rendered}
          content={formation.content.rendered}
          school={formation.custom_fields.school}
          location={formation.custom_fields.location}
          year={formation.custom_fields.year}
        />
      })}
    </>
  )
}

function ExperiencesController() {
  return useGetContent(ExperienceWrapper, '/xp/experience')
}

function FormationsController() {
  return useGetContent(FormationWrapper, '/edu/formation')
}

export default function CVController() {
  return <CVContainer>
    <>
      <ExperiencesController />
      <FormationsController />
    </>
  </CVContainer>
}
