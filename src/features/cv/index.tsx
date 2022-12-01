import {useState} from 'react'
import useGetContent from '../../hooks/useGetContent'
import {ExperienceInterface, Experience} from './Experience'
import {FormationInterface, Formation} from './Formation'

import CVContainer from './CVContainer'
import Accordion from '../../components/Accordion'

import './CV.css'

function paginateArray(array: ExperienceInterface[], limit: number) {
  return [
    array.slice(0, limit)
    , array.slice(limit)
  ]
}

function ExperienceWrapper(props: {
  fetched: ExperienceInterface[]
}) {
  const [xpShowAll, setXPShowAll] = useState(false)

  const experiences = props.fetched

  const [
    experiencesToShow,
    experiencesToHide
  ] = paginateArray(experiences, 8)

  const handleXPShowAll = () => setXPShowAll(!xpShowAll)

  return (
    <>
      <h2>💻Expériences</h2>
      {experiencesToShow.map((xp: ExperienceInterface, index: number) => {
        return <Experience
          title={xp.title.rendered}
          content={xp.content.rendered}
          company={xp.custom_fields.company}
          location={xp.custom_fields.location}
          period={xp.custom_fields.period}
          key={xp.custom_fields.period}
        />
      })}

      <Accordion
        handleOpen={handleXPShowAll}
        open={xpShowAll}
        titleToShow="Afficher plus d’expériences"
        titleToHide="Masquer quelques expériences"
      >
        {experiencesToHide.map((xp: ExperienceInterface, index: number) => {
          return <Experience
            title={xp.title.rendered}
            content={xp.content.rendered}
            company={xp.custom_fields.company}
            location={xp.custom_fields.location}
            period={xp.custom_fields.period}
            key={xp.custom_fields.period}
          />
        })}
      </Accordion>
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
          key={formation.title.rendered}
        />
      })}
    </>
  )
}

function ExperiencesController() {
  return useGetContent(ExperienceWrapper, '/xp/experience?per_page=20')
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
