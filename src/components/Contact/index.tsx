import './Contact.css'
import AlarmIcon from '../Icons/AlarmIcon'
import CTA from '../CTA'
import React, { useState } from 'react'
import Thanking from './Thanking'
import {Form, useActionData} from 'react-router-dom'
import {buildInputStatusClass} from './contactHelper'

export default function Contact(props: {messagePlaceholder?: string}) {
  const {messagePlaceholder} = props

  const postContactResponse = useActionData() as {
    status: string
    , invalid_fields: {field: string, message: string}[]
  } | undefined

  const [email, setEmail] = useState(() => ({
    edited: false
    , valid: false
  }))

  const [message, setMessage] = useState(() => ({
    edited: false
    , valid: false
  }))

  let errorsFromApi = {
    email: false
    , message: false
  }

  if (postContactResponse?.status === 'mail_sent')
    return <Thanking />

  postContactResponse?.invalid_fields.forEach((field: any) => {
    if (field.field === 'your-email')
      errorsFromApi.email = true

    if (field.field === 'your-message')
      errorsFromApi.message = true
  })

  // Put status valid | invalid but dont warn user yet
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    const valid = Boolean(
      email.match(
        /^[a-z0-9.+!#$%&'*-/=?^_`{}|]+@[a-z0-9.-]{2,63}\.[a-z]{2,}$/i
      )
    )
    // Do not disturb user on typing
    // so dont check display error until is blur
    // First typing email should not warn on first letters
    setEmail(prev => ({...prev, ...{valid}}))
  }

  // Warn or not user with couple 'valid' AND 'edited' status
  const handleBlurEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setEmail(prev => ({...prev, ...{edited: email !== ''}}))
  }

  // Put status valid | invalid but dont warn user yet
  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value
    const valid = Boolean(
      message.match(/^.+\s.+\s.+$/)
    )
    // Do not disturb user on typing
    // so dont check if display error until is blur
    // First typing message should not warn on first letters
    setMessage(prev => ({...prev, ...{valid}}))
  }

  // Warn or not user with 'couple' valid AND 'edited' status
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
