import ChevronDoubleDown from '../Icons/ChevronDoubleDown'
import ChevronDoubleUp from '../Icons/ChevronDoubleUp'
import './Accordion.css'

export default function Accordion(props: {
  handleOpen: React.MouseEventHandler<HTMLButtonElement>
  , open: Boolean
  , children: JSX.Element[]
  , titleToShow: string
  , titleToHide: string
}) {

  return (
    <div
      className={`Accordion ${props.open ? 'show' : 'hide'}`}
    >
      {props.open ?
        <button
          className="read-more"
          title={props.titleToHide}
          onClick={props.handleOpen}
        >
          <ChevronDoubleUp />
        </button> :
        <button
          className="read-more"
          title={props.titleToShow}
          onClick={props.handleOpen}
        >
          <ChevronDoubleDown />
        </button>
      }

      {props.children}

      {props.open ?
        <button
          className="read-more"
          title={props.titleToHide}
          onClick={props.handleOpen}
        >
          <ChevronDoubleUp />
        </button> :
        null
      }
    </div>
  )
}
