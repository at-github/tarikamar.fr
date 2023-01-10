import {postContact} from './api'

export async function postContactWithSubject(
  form: FormData,
  subject: string
) {
  form.append('your-subject', subject)

  return postContact(form).then(response => response)
}
