import { MinLength, IsOptional } from 'class-validator'

export default class CreateUserDto {
  @MinLength(1)
  iss: string

  @MinLength(1)
  sub: string

  @IsOptional()
  name?: string
}
