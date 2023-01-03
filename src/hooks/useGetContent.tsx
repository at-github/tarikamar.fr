import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import myFetch from '../services/myFetch'

import LoadingIcon from '../components/Icons/LoadingIcon'

function Content(props: {
    Component: (fetched: any) => JSX.Element
    , url: string
  }
) {
  const {isLoading, error, data} = useQuery('data', () =>
    myFetch(props.url)
  )

  if (isLoading) return <LoadingIcon />

  if (error) return <>'Une erreur est survenue'</>

  return <props.Component fetched={data} />
}

function useGetContent(
  Component: (fetched: any) => JSX.Element
  , url: string
) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Content url={url} Component={Component}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default useGetContent
