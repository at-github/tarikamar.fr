import {useState} from 'react'
import useGetContent from '../../hooks/useGetContent'
import bisectArray from '../../services/bisectArray'
import {ExperienceInterface, Experience} from './Experience'
import {FormationInterface, Formation} from './Formation'

import CVContainer from './CVContainer'
import Accordion from '../../components/Accordion'

import './CV.css'

function ExperienceWrapper(props: {
  fetched: ExperienceInterface[]
}) {
  const [xpShowAll, setXPShowAll] = useState(false)

  const experiences = props.fetched

  const [
    experiencesToShow,
    experiencesToHide
  ] = bisectArray(experiences, 8)

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
  const [formationShowAll, setFormationShowAll] = useState(false)
  const formations = props.fetched

  const [
    formationsToShow,
    formationsToHide
  ] = bisectArray(formations, 4)

  const handleFormationShowAll = () => setFormationShowAll(!formationShowAll)

  return (
    <>
      <h2>🎓 Formations</h2>
      {formationsToShow.map((formation: any) => {
        return <Formation
          title={formation.title.rendered}
          content={formation.content.rendered}
          school={formation.custom_fields.school}
          location={formation.custom_fields.location}
          year={formation.custom_fields.year}
          key={formation.title.rendered}
        />
      })}

      <Accordion
        handleOpen={handleFormationShowAll}
        open={formationShowAll}
        titleToShow="Afficher plus de formations"
        titleToHide="Masquer quelques formations"
      >
        {formationsToHide.map((formation: any) => {
          return <Formation
            title={formation.title.rendered}
            content={formation.content.rendered}
            school={formation.custom_fields.school}
            location={formation.custom_fields.location}
            year={formation.custom_fields.year}
            key={formation.title.rendered}
          />
        })}
      </Accordion>
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
