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
      <h4>{props.period} - {props.location}</h4>
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html: props.content
        }}
      />
    </article>
  )
}
