import { Injectable } from '@nestjs/common'
import { TokenSet } from 'openid-client'
import { Profile } from 'passport-google-oauth20'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async loginOrRegisterUserFromGoogle(profile: Profile): Promise<User> {
    const iss = 'https://accounts.google.com'

    const user = await this.usersService.findUserByIssAndSub({
      iss,
      sub: profile.id
    })

    if (user) {
      return user
    } else {
      return await this.usersService.createUser({
        iss,
        sub: profile.id,
        name: profile.displayName
      })
    }
  }

  public async getOrCreateUserFromTokenSet(tokenSet: TokenSet): Promise<User> {
    const jwtClaims = tokenSet.claims()

    const user = await this.usersService.findByIssAndSub(
      jwtClaims.iss,
      jwtClaims.sub
    )

    if (user) {
      return user
    } else {
      const newlyCreatedUser = await this.usersService.create({
        iss: jwtClaims.iss,
        sub: jwtClaims.sub,
        name: jwtClaims.name
      })

      return newlyCreatedUser
    }
  }
}
