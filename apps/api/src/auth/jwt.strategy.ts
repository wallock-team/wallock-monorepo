import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { User } from 'src/users'

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super()
  }

  async validate(): Promise<User | false> {
    return false
  }
}
