import React from 'react'
import myFetch from '../../services/myFetch'
import AlarmIcon from '../AlarmIcon'
import '../../Form.css'

interface InterfaceProps {}

enum EnumFormState {
  none = 'none',
  processing = 'processing',
  sent = 'sent'
}

interface InterfaceState {
  email: {
    edited: boolean
    , value: string
    , valid: boolean
  }, message: {
    edited: boolean
    , value: string
    , valid: boolean
  }, form: {
    state: EnumFormState
  }
}

export default class Contact extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: {}) {
    super(props)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleBlurEmail = this.handleBlurEmail.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleBlurMessage = this.handleBlurMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setFormSent = this.setFormSent.bind(this)
    this.state = {
      email: {
        edited: false
        , value: ''
        , valid: false
      }, message: {
        edited: false
        , value: ''
        , valid: false
      }, form: {
        state: EnumFormState.none
      }
    }
  }

  /* Duplicate code, can’t make common code
   * because using dynamic key with typescript is not beautifull
   */
  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const inputEmail = e.target.value
    const isValidEmail = Boolean(
      inputEmail.match(
        /^[a-z0-9.+!#$%&'*-/=?^_`{}|]+@[a-z0-9.-]{2,63}\.[a-z]{2,}$/i
      )
    )

    this.setState((prevState: InterfaceState) =>
      ({email: {
        ...prevState.email
        , value: inputEmail
        , valid: isValidEmail
      }})
    )
  }

  handleBlurEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const inputEmail = e.target.value

    this.setState((prevState: InterfaceState) =>
      ({email: {
        ...prevState.email
        , edited: inputEmail !== ''
      }})
    )
  }

  handleChangeMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputMessage = e.target.value
    const isValidMessage = Boolean(
      inputMessage.match(/^.+\s.+\s.*$/)
    )

    this.setState((prevState: InterfaceState) =>
      ({message: {
        ...prevState.message
        , value: inputMessage
        , valid: isValidMessage
      }})
    )
  }

  handleBlurMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputMessage = e.target.value

    this.setState((prevState: InterfaceState) =>
      ({message: {
        ...prevState.message
        , edited: inputMessage !== ''
      }})
    )
  }

  setFormSent(json: any) {
    if (json.status === 'mail_sent')
      this.setState({form: {state: EnumFormState.sent}})
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (
      this.state.email.valid === false
      || this.state.message.valid === false
    ) {
      if (this.state.email.value === '')
        this.setState((prevState: InterfaceState) =>
          ({email: {...prevState.email, edited: true}})
        )

      if (this.state.message.value === '')
        this.setState((prevState: InterfaceState) =>
          ({message: {...prevState.message, edited: true}})
        )

      return
    }

    this.setState((prevState: InterfaceState) =>
      ({form: {...prevState.form, state: EnumFormState.processing}})
    )

    const body = new FormData()
    body.append('your-email', this.state.email.value)
    body.append('your-message', this.state.message.value)

    myFetch(
      '/contact-form-7/v1/contact-forms/49/feedback'
      , {
        body
        , method: 'POST'
        , callback: this.setFormSent
      }
    )
  }

  render() {
    if (this.state.form.state === EnumFormState.sent)
      return (
        <div className="thanking">
          <p><img src="/img/confetti-outline.apng" alt="Message envoyé !" /></p>
          <h3>À bientôt</h3>
        </div>
      )

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <label
            className={`error${
              this.state.email.edited && this.state.email.valid === false ?
                ' visible' : ''
            }`}
          >
            <AlarmIcon />Désolé mais un email valide est requis
          </label>
          <input
            type="email"
            placeholder="Votre email"
            onChange={this.handleChangeEmail}
            onBlur={this.handleBlurEmail}
            className={
              `${this.state.email.edited ? 'email-edited' : ''}`
              + ` ${this.state.email.valid ?
                'email-is-valid'
                : 'email-not-valid'}`
            }
          />
        </div>

        <div className="form-row">
          <label
            className={`error${
              this.state.message.edited && this.state.message.valid === false ?
                ' visible' : ''
            }`}
          >
            <AlarmIcon />
            Quelques mots pour décrire notre prise de contact peut-être ?
          </label>
          <textarea
            placeholder="Donnez moi une idée de l’aide dont vous avez besoin"
            rows={4}
            cols={45}
            onChange={this.handleChangeMessage}
            onBlur={this.handleBlurMessage}
            className={
              `${this.state.message.edited ? 'message-edited' : ''} `
              + `${this.state.message.valid ?
                'message-is-valid'
                : 'message-not-valid'}`
            }
          />
        </div>

        <div className="form-row">
          <button
            type="submit"
            className="CTA"
            disabled={this.state.form.state === EnumFormState.processing}
          >
            Contactez-moi
          </button>
        </div>
      </form>
    )
  }
}
