import axios from './config-axios'
import {
  GetServerSideProps,
  PreviewData,
  GetServerSidePropsContext
} from 'next'
import { ParsedUrlQuery } from 'querystring'

type AuthenticatedProps = { [key: string]: any }

const withAuthPage = <
  P extends AuthenticatedProps = AuthenticatedProps,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  getServerSideProps?: GetServerSideProps<P, Q, D>
) => {
  return async function (context: GetServerSidePropsContext<Q, D>) {
    const authenticated = await axios.get('/me', {
      headers: {
        cookie: String(context.req.headers.cookie)
      }
    })
    if (authenticated.status === 200) {
      return getServerSideProps
        ? {
            ...(await getServerSideProps(context))
          }
        : {
            props: {
              user: authenticated.data
            }
          }
    } else {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  }
}

type User = {
  iss: string
  sub: string
  name: string
}

export default withAuthPage
