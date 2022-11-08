import { BaseDto } from '../common/base.dto'

export type ReadUserDto = {
  iss: string
  sub: string
  firstName?: string
  lastName?: string
} & BaseDto
