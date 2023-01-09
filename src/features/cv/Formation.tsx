export interface FormationAPIInterface {
  id: number
  , content: {
      rendered: string
    }
  , title: {
    rendered: string
  }
  , custom_fields: {
    school: string
    , year: string
    , location: string
  }
}

export function Formation(props: {
    title: string
    , content: string
    , school: string
    , location: string
    , year: number
}) {
  return (
    <article>
      <h3>{props.title} <span>chez <em>{props.school}</em></span></h3>
      <h4>{props.year} : <em>{props.location}</em></h4>
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html: props.content
        }}
      />
    </article>
  )
}
