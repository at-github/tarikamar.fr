import './CV.css'

export default function CVContainer(props: {
  children: JSX.Element
}) {
  return (
    <div className="content cv">
      <header>
        <h1>CV</h1>
      </header>
      {props.children}
    </div>
  )
}
