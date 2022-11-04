import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt'
import { Request } from 'express'

import { User } from 'src/users'
import { EnvService } from 'src/env'
import { UsersService } from 'src/users'

function fromCookie(req: Request): string | null {
  return req.cookies?.jwt
}
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    envService: EnvService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([fromCookie]),
      secretOrKey: envService.jwtSecret
    })
  }

  async validate(jwt: any): Promise<User | false> {
    if (
      !jwt ||
      typeof jwt !== 'object' ||
      !jwt.sub ||
      typeof jwt.sub !== 'number'
    ) {
      return false
    }

    const user = await this.userService.getUserById(jwt.sub)

    if (!user) {
      return false
    } else {
      return user
    }
  }
}
