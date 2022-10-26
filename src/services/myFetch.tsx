const myFetch = (
  route: string
  , options?: {
      body?: any
      , method?: string
      , callback?: Function
    }
) => {
  const domain = 'https://api.tarikamar.fr/wp-json'

  return fetch(
    `${domain}${route}`
    , {
      credentials: 'include'
      , mode: 'cors'
      , method: options && options.method ? options.method : 'GET'
      , body: options && options.body ? options.body : null
    }
  )
    .then(res => res.json())
    .then(json => {
      if (options && options.callback)
        options.callback(json)

      return json
    })
}

export default myFetch
