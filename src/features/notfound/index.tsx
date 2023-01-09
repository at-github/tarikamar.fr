import { useRouteError } from 'react-router-dom'

export default function NotFound() {
  const error = useRouteError() as {statusText?: string, message?: string}
  console.error('⚠', error);

  return (
    <>
      <p>Oups</p>
      <p>{error.statusText || error.message}</p>
    </>
  )
}
