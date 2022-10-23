import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { jwtVerify, importJWK } from 'jose'
import googleOidcInfomation from './google-oidc-information'
import jwt_decode from 'jwt-decode'

type JwtHeader = {
  alg: string
  typ: string
  kid: string
}

type User = {
  iss: string
  sub: string
  iat: number
  exp: number
  [key: string]: unknown
}

type GetAuthenticatedServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<Q, D>,
  user: User
) => Promise<GetServerSidePropsResult<P>>

const withAuthenticatedUser = async <
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  context: GetServerSidePropsContext<Q, D>,
  getServerSideProps?: GetAuthenticatedServerSideProps<P, Q, D>
): Promise<GetServerSidePropsResult<P | { user: User }>> => {
  const idToken = context.req.cookies?.id_token
  const user = await verify(idToken)

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  } else {
    if (getServerSideProps) {
      return await getServerSideProps(context, user)
    } else {
      return {
        props: {
          user,
        },
      }
    }
  }
}

const verify = async (idToken?: string): Promise<User | false> => {
  if (!idToken) {
    return false
  }

  const decodedIdToken = decodeIdToken(idToken)

  const key = googleOidcInfomation.jwks.keys.find(
    (key) => key.kid === decodedIdToken.header.kid
  )

  if (!key) {
    return false
  }

  await jwtVerify(idToken, await importJWK(key, 'RS256'))

  return decodedIdToken.payload as User
}

const decodeIdToken = (idToken: string) => {
  return {
    header: jwt_decode<JwtHeader>(idToken, { header: true }),
    payload: jwt_decode<User>(idToken),
  }
}

export default withAuthenticatedUser
