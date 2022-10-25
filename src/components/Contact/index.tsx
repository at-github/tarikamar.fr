import React from 'react';
import '../../Form.css';

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
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState: InterfaceState) =>
      ({email: {...prevState.email, edited: true}})
    )

    const inputEmail = e.target.value
    const isValidEmail = Boolean(
      inputEmail.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/i)
    )

    this.setState((prevState: InterfaceState) =>
      ({email: {
        ...prevState.email
        , value: inputEmail
        , valid: isValidEmail
      }})
    )
  }

  handleChangeMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState((prevState: InterfaceState) =>
      ({message: {...prevState.message, edited: true}})
    )

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

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (
      this.state.email.valid === false
      || this.state.message.valid === false
    ) {
      return
    }

    this.setState((prevState: InterfaceState) =>
      ({form: {...prevState.form, state: EnumFormState.processing}})
    )

    this.setState({form: {state: EnumFormState.sent}});
  }

  render() {
    if (this.state.form.state === EnumFormState.sent)
      return (
        <div className="thanking">
          <p><img src="/img/confetti-outline.apng" /></p>
          <h3>À bientôt</h3>
        </div>
      )

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <input
            type="email"
            placeholder="Votre email"
            onChange={this.handleChangeEmail}
            className={
              `${this.state.email.edited ? 'email-edited' : ''}`
              + ` ${this.state.email.value === '' || this.state.email.valid ?
                'email-is-valid'
                : 'email-not-valid'}`
            }
          />
        </div>

        <div className="form-row">
          <textarea
            placeholder="Donnez moi une idée de l’aide dont vous avez besoin"
            rows={4}
            cols={45}
            onChange={this.handleChangeMessage}
            className={
              `${this.state.message.edited ? 'message-edited' : ''} `
              + `${this.state.message.value === '' || this.state.message.valid ?
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
