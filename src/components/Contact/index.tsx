import React, { useState } from 'react'
import {Form, useActionData} from 'react-router-dom';

import CTA from '../CTA'

import AlarmIcon from '../Icons/AlarmIcon'

import './Contact.css'

function Thanking() {
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
}

function ContactForm(props: {
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
        `form-row
          ${email.edited || errorsFromApi.email ? 'edited' : ''}
          ${!email.valid || errorsFromApi.email ? 'not-valid' : ''}
        `}>
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
        `form-row
          ${message.edited || errorsFromApi.message ? 'edited' : ''}
          ${!message.valid || errorsFromApi.message ? 'not-valid' : ''}
        `}>
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

export default function Contact(props: {messagePlaceholder?: string}) {
  const {messagePlaceholder} = props
  const postContactResponse = useActionData() as {
    status: string
    , invalid_fields: {field: string, message: string}[]
  } | undefined

  let errorsFromApi = {
    email: false
    , message: false
  }

  postContactResponse?.invalid_fields.forEach((field: any) => {
    if (field.field === 'your-email')
      errorsFromApi.email = true

    if (field.field === 'your-message')
      errorsFromApi.message = true
  })

  const [email, setEmail] = useState(() => ({
    edited: false
    , valid: false
  }))

  const [message, setMessage] = useState(() => ({
    edited: false
    , valid: false
  }))

  if (postContactResponse?.status === 'mail_sent')
    return <Thanking />

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    const valid = Boolean(
      email.match(
        /^[a-z0-9.+!#$%&'*-/=?^_`{}|]+@[a-z0-9.-]{2,63}\.[a-z]{2,}$/i
      )
    )
    // Do not disturb user on typing
    // so dont check if dont mark email as edited now
    // First typing email should not warn on first letters
    setEmail(prev => ({...prev, ...{valid}}))
  }

  const handleBlurEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setEmail(prev => ({...prev, ...{edited: email !== ''}}))
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value
    const valid = Boolean(
      message.match(/^.+\s.+\s.+$/)
    )
    // Do not disturb user on typing
    // so dont check if dont mark message as edited now
    // First typing message should not warn on first letters
    setMessage(prev => ({...prev, ...{valid}}))
  }
  const handleBlurMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value
    setMessage(prev => ({...prev, ...{edited: message !== ''}}))
  }

  return <ContactForm
    {
      ...{
        email
        , message
        , errorsFromApi
        , handleChangeEmail
        , handleBlurEmail
        , handleChangeMessage
        , handleBlurMessage
        , messagePlaceholder
      }
    }
  />
}
