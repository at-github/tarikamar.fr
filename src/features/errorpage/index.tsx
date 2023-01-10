import {useRouteError} from 'react-router-dom'
import Layout from '../../components/Layout';

export default function ErrorPage() {
  const error = useRouteError() as {statusText?: string, message?: string}
  console.error('⚠', error);

  return (
    <Layout>
      <h1>Oups</h1>
      <p style={{textAlign: 'center'}}>
        <img
          alt="Tarik fixing bug"
          width="400px"
          height="200px"
          src="/img/error.svg"
        />
      </p>
      <h2 style={{textAlign: 'center'}}>{error.statusText || error.message}</h2>
    </Layout>
  )
}
