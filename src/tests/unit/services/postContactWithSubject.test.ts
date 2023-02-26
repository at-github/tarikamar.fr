import {postContactWithSubject} from '../../../services/postContactWithSubject'
import * as api from '../../../services/api'

test('Call postContact correctly', () => {
  const form = new FormData()

  const spy = jest.spyOn(api, 'postContact')
    .mockImplementation(() => new Promise(
      () => { return {test: 'test'}}
    ))

  const response = postContactWithSubject(form, 'A subject') // Form is empty !

  expect(spy).toHaveBeenCalledTimes(1)

  const formReceived = Object.fromEntries(spy.mock.calls[0][0])
  expect(formReceived).toEqual({'your-subject': 'A subject'})

  expect(response).toBeInstanceOf(Promise)
})
