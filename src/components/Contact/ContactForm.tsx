import AlarmIcon from '../Icons/AlarmIcon'
import CTA from '../CTA'
import {Form} from 'react-router-dom'
import {buildInputStatusClass} from './contactHelper'

export default function ContactForm(props: {
  email: {edited: boolean, valid: boolean}
  , message: {edited: boolean, valid: boolean}
  , errorsFromApi: {email: boolean, message: boolean}
  , handleChangeEmail: React.ChangeEventHandler<HTMLInputElement>
  , handleBlurEmail: React.ChangeEventHandler<HTMLInputElement>
  , handleChangeMessage: React.ChangeEventHandler<HTMLTextAreaElement>
  , handleBlurMessage: React.ChangeEventHandler<HTMLTextAreaElement>
  , messagePlaceholder?: string
}) {
  const {
    email
    , message
    , errorsFromApi
    , handleChangeEmail
    , handleBlurEmail
    , handleChangeMessage
    , handleBlurMessage
    , messagePlaceholder
  } = props

  return (
    <Form method="post" id="contact">
      <div className={
        buildInputStatusClass('form-row', email, errorsFromApi.email)
      }>
        <label className="error">
          <AlarmIcon />
          Désolé mais un email valide est requis
        </label>

        <input
          type="email"
          name="your-email"
          placeholder="Votre email"
          onChange={handleChangeEmail}
          onBlur={handleBlurEmail}
        />
      </div>

      <div className={
        buildInputStatusClass('form-row', message, errorsFromApi.message)
      }>
        <label className="error">
          <AlarmIcon />
          Quelques mots pour décrire notre prise de contact peut-être ?
        </label>
        <textarea
          name="your-message"
          placeholder={messagePlaceholder ?? '…'}
          rows={4}
          cols={45}
          onChange={handleChangeMessage}
          onBlur={handleBlurMessage}
        />
      </div>

      <div className="form-row">
        <CTA
          disabled={!(email.valid && message.valid)}
          text="Contactez-moi"
        />
      </div>
    </Form>
  )
}
