import './Accordion.css'

export default function Accordion(props: {
  handleOpen: React.MouseEventHandler<HTMLDivElement>
  , open: Boolean
  , children: JSX.Element[]
}) {

  return (
    <div
      className={`Accordion ${props.open ? 'show' : 'hide'}`}
      onClick={props.handleOpen}
    >
      {props.children}
    </div>
  )
}
