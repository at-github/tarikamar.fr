import myFetch from '../../../services/myFetch'

beforeEach(() => {
  process.env.REACT_APP_API_DOMAIN = 'domain';

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({response: 'response'})
  })) as jest.Mock
})

const defaultOptions = {
  body: null
  , credentials: 'include'
  , method: 'GET'
  , mode: 'cors'
}

test('Route string is used with domain in env', async () => {
  const fetched = myFetch('/route')

  expect(await fetched).toEqual({response: 'response'})
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith(
    'domain/route',
    defaultOptions
  )
})

test('callback is call', async () => {
  const callback = jest.fn()
  const fetched = myFetch('/route', {callback})

  expect(await fetched).toEqual({response: 'response'})
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith(
    'domain/route',
    defaultOptions
  )
})
