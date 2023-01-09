import {useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import {get} from '../../services/api'
import bisectArray from '../../services/bisectArray'
import {ExperienceAPIInterface, Experience} from './Experience'
import {FormationAPIInterface, Formation} from './Formation'
import Contact from '../../components/Contact'

import CVContainer from './CVContainer'
import Accordion from '../../components/Accordion'

import './CV.css'

interface ExperienceElementInterface {
    content: string
    , title: string
    , company: string
    , period: string
    , location: string
    , collection: {
      status: boolean
      , position: string
    }
}

function prepareListExperiences(
  experiences: ExperienceAPIInterface[]
): ExperienceElementInterface[] {
  return experiences.map(experience => ({
    content: experience.content.rendered
    , title: experience.title.rendered
    , company: experience.custom_fields.company
    , period: experience.custom_fields.period
    , location: experience.custom_fields.location
    , collection: {
      status: false
      , position: ''
    }
  }))
}

function setCollection(experiences: ExperienceElementInterface[]) {
  let previousExperience: ExperienceElementInterface = {
    content: ''
    , title: ''
    , company: ''
    , period: ''
    , location: ''
    , collection: {
      status: false
      , position: ''
    }
  }

  let collectionIndex = 0

  return experiences.map((experience, index) => {
    const {company}                  = experience
    const {company: previousCompany} = previousExperience

    if (company === previousCompany) {
      collectionIndex++
      experience.collection =
        previousExperience.collection = {
          status: true
          , position: collectionIndex === 1 ? 'first' : ''
        }
    }

    return previousExperience = experience
  })
}

function Experiences() {
  const [xpShowAll, setXPShowAll] = useState(false)
  const data = useLoaderData() as {experiences: ExperienceAPIInterface[]}
  const experiences = setCollection(prepareListExperiences(data.experiences))

  const [
    experiencesToShow,
    experiencesToHide
  ] = bisectArray(experiences, 8)

  const handleXPShowAll = () => setXPShowAll(!xpShowAll)

  return (
    <>
      <h2>💻Expériences</h2>
      {experiencesToShow.map((
        xp: ExperienceElementInterface
      ) => {
        return <Experience
          title={xp.title}
          content={xp.content}
          company={xp.company}
          location={xp.location}
          period={xp.period}
          collection={xp.collection}
          key={xp.period}
        />
      })}

      <Accordion
        handleOpen={handleXPShowAll}
        open={xpShowAll}
        titleToShow="Afficher plus d’expériences"
        titleToHide="Masquer quelques expériences"
      >
        {experiencesToHide.map((
          xp: ExperienceElementInterface, index: number
        ) => {
          return <Experience
            title={xp.title}
            content={xp.content}
            company={xp.company}
            location={xp.location}
            period={xp.period}
            collection={xp.collection}
            key={xp.period}
          />
        })}
      </Accordion>
    </>
  )
}

function Formations() {
  const [formationShowAll, setFormationShowAll] = useState(false)
  const {formations} = useLoaderData() as {formations: FormationAPIInterface[]}

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

function getExperiences() {
  return get('/xp/experience?per_page=20') // By default it's return 10 items
}

function getFormations() {
  return get('/edu/formation')
}

export async function getCV() {
  return {
    experiences: await getExperiences()
    , formations: await getFormations()
  }
}

export default function CVController() {
  // FIXME check contact class on other page
  return <CVContainer>
    <>
      <Experiences />
      <Formations />
      <div className="big-row contact">
        <div>
          <h3>Vous recherchez un développeur ?</h3>
          <p>
            Actuellement en recherche active
            d'une entreprise contribuant au bien commun
          </p>
          <h1>Contactez moi</h1>
          <Contact />
        </div>
      </div>
    </>
  </CVContainer>
}
