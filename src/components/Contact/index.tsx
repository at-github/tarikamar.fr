import React, { useState } from 'react'
import {ActionFunctionArgs, Form, useActionData} from 'react-router-dom';

import {postContact} from '../../services/api'
import CTA from '../CTA'

import AlarmIcon from '../Icons/AlarmIcon'

import './Contact.css'

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

export async function postContactAction({request} : ActionFunctionArgs) {
  const formData = await request.formData()

  return postContact(formData).then(response => response)
}

export default function Contact() {
  const postContactResponse = useActionData() as {
    status: string
    , invalid_fields: {field: string, message: string}[]
  } | undefined
  console.log({postContactResponse})
  const [email, setEmail] = useState({edited: false, valid: false})

  if (postContactResponse?.status === 'mail_sent')
    return (
      <div className="thanking">
        <p>
          <img
            src="/img/confetti-outline.apng"
            width="200px"
            height="200px"
            alt="Message envoyé !"
          />
        </p>
        <h3>À bientôt</h3>
      </div>
    )

  const state = {
    email: {
      edited: false
      , valid: false
    }
    , message: {
      edited: false
      , valid: false
    }
    , form: {
      state: ''
    }
  }

  if (postContactResponse) {
    state.email.edited = true
    state.message.edited = true
  }

  let emailErrorFromApi = false
  let messageErrorFromApi = false

  postContactResponse?.invalid_fields.forEach((field: any) => {
    if (field.field === 'your-email')
      emailErrorFromApi = true

    if (field.field === 'your-message')
      messageErrorFromApi = true
  })

  console.log(emailErrorFromApi)

  const handleChangeEmail = () => {
    console.log('handleChangeEmail')
  }
  const handleBlurEmail = () => {
    console.log('handleBlurEmail')
  }

  const handleChangeMessage = () => {
    console.log('handleChangeMessage')
  }
  const handleBlurMessage = () => {
    console.log('handleBlurMessage')
  }

  return(
    <Form method="post" id="contact">
      <div className="form-row">
        <label
          className={`error${
            emailErrorFromApi ?
              ' visible' : ''
          }`}
        >
          <AlarmIcon />
          Désolé mais un email valide est requis
        </label>

        <input
          type="email"
          name="your-email"
          placeholder="Votre email"
          onChange={handleChangeEmail}
          onBlur={handleBlurEmail}
          className={
            `${state.email.edited ? 'email-edited' : ''}`
            + ` ${!emailErrorFromApi ?
              'email-is-valid'
              : 'email-not-valid'}`
          }
        />
      </div>

      <div className="form-row">
        <label
          className={`error${
            messageErrorFromApi ?
              ' visible' : ''
          }`}
        >
          <AlarmIcon />
          Quelques mots pour décrire notre prise de contact peut-être ?
        </label>
        <textarea
          name="your-message"
          placeholder="Donnez moi une idée de l’aide dont vous avez besoin"
          rows={4}
          cols={45}
          onChange={handleChangeMessage}
          onBlur={handleBlurMessage}
          className={
            `${state.message.edited ? 'message-edited' : ''} `
            + `${!messageErrorFromApi ?
              'message-is-valid'
              : 'message-not-valid'}`
          }
        />
      </div>

      <div className="form-row">
        <CTA
          disabled={state.form.state === EnumFormState.processing}
          loading={state.form.state === EnumFormState.processing}
          text="Contactez-moi"
        />
      </div>
    </Form>
  )
}
