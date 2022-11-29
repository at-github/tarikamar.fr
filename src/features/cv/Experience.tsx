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
      <h2>{props.title}</h2>
      <h2>{props.company}</h2>
      <h2>{props.location}</h2>
      <h2>{props.period}</h2>
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html: props.content
        }}
      />
    </article>
  )
}
