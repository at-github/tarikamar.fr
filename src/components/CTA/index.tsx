import LoadingIcon from '../Icons/LoadingIcon';

import './CTA.css';

const CTA = function(props: {
    disabled?: boolean
    , loading?: boolean
    , text: string
  }) {

  return (
    <button
      type="submit"
      className="CTA"
      disabled={props.disabled}
    >
      {props.loading ?
        <>Patientez svp <LoadingIcon /></>
        : props.text
      }
    </button>
  )
}

export default CTA;
