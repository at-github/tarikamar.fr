import myFetch from './myFetch'

export const postContact = (body: FormData) =>
  myFetch(
    '/contact-form-7/v1/contact-forms/49/feedback'
    , {
      body
      , method: 'POST'
    }
  )

export const get = (route: string) => myFetch(route)
