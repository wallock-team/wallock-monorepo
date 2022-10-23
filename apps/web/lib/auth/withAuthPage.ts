import axios from './config-axios'
import {
  GetServerSideProps,
  PreviewData,
  GetServerSidePropsContext,
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
    const amILoggedInResponse = await axios.get('/auth/am-i-logged-in', {
      headers: {
        cookie: String(context.req.headers.cookie),
      },
    })
    if (amILoggedInResponse.status === 200) {
      return getServerSideProps
        ? {
            ...(await getServerSideProps(context)),
            
            
          }
        : {
            props: {
              user: amILoggedInResponse.data,
            },
          }
    } else {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
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
