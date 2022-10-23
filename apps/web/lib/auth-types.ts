import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next/types'
import { ParsedUrlQuery } from 'querystring'

export type User = {
  iss: string
  sub: string
  iat: number
  exp: number
  [key: string]: unknown
}

export type GetAuthenticatedServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<Q, D>,
  user: User
) => Promise<GetServerSidePropsResult<P>>

export type JwtHeader = {
  alg: string
  typ: string
  kid: string
}
