import { BaseEntity } from './base-entity'

export type User = BaseEntity & {
  iss: string
  sub: string
  name: string
}
