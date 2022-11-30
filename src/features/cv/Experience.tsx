import moment from 'moment'
import 'moment/locale/fr';

moment.locale('fr', null)

export interface ExperienceInterface {
  id: number
  , content: {
      rendered: string
    }
  , title: {
    rendered: string
  }
  , custom_fields: {
    company: string
    , period: string
    , location: string
  }
}

function formatPeriod(period: string) {
  let dates = period.split(',')

  return dates.map(date => {
    if (date === '')
      return 'à ce jour'

    return moment(date).format('YYYY MMMM')
  }).join(' ⟷   ')
}

export function Experience(props: {
    title: string
    , content: string
    , company: string
    , location: string
    , period: string
}) {
  return (
    <article>
      <h3>{props.title} <span>chez <em>{props.company}</em></span></h3>
      <h4>{formatPeriod(props.period)} : <em>{props.location}</em></h4>
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html: props.content
        }}
      />
    </article>
  )
}
