const myFetch = (
  route: string
  , options?: {
      body?: any
      , method?: string
      , callback?: Function
    }
) => {
  const domain = process.env.REACT_APP_API_DOMAIN

  if (!domain)
    throw new Error('"domain" is not defined')

  return fetch(
    `${domain}${route}`
    , {
      credentials: 'include'
      , mode: 'cors'
      , method: options && options.method ? options.method : 'GET'
      , body: options && options.body ? options.body : null
    }
  )
    .then(res => {
      if (res.status >= 400)
        throw new Response(
          ''
          , {
            status: res.status
            , statusText: res.statusText
          }
        )

      return res.json()
    })
    .then(json => {
      if (options && options.callback)
        options.callback(json)

      return json
    })
}

export default myFetch
