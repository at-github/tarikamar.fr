import React from 'react';
import '../../Form.css';

interface interfaceProps {}

interface interfaceState {
  email: {
    edited: boolean
    , value: string
    , valid: boolean
  }
}

export default class Contact extends React.Component<
  interfaceProps,
  interfaceState
> {
  constructor(props: {}) {
    super(props)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.state = {
      email: {
        edited: false
        , value: ''
        , valid: false
      }
    }
  }

  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState: interfaceState) =>
      ({email: {...prevState.email, edited: true}})
    )

    const inputEmail = e.target.value
    const isValidEmail = Boolean(
      inputEmail.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/i)
    )

    this.setState((prevState: interfaceState) =>
      ({email: {
        ...prevState.email
        , value: inputEmail
        , valid: isValidEmail
      }})
    )
  }

  render() {
    return (
      <form>
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
          />
        </div>

        <div className="form-row">
          <button
            type="submit"
            className="CTA"
          >
            Contactez-moi
          </button>
        </div>
      </form>
    )
  }
}
