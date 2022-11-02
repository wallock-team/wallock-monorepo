import { forwardRef, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile, StrategyOptions } from 'passport-google-oauth20'
import EnvService from 'src/env/env.service'
import { User } from 'src/users/entities/user.entity'

export default class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google'
) {
  constructor(
    @Inject(forwardRef(() => EnvService))
    envService: EnvService
  ) {
    const strategyOpts: StrategyOptions = {
      clientID: envService.oidc.google.clientId,
      clientSecret: envService.oidc.google.clientSecret,
      scope: ['openid', 'profile'],
      callbackURL: `${envService.baseUrl}/login-with-google`
    }

    super(strategyOpts)
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<User | false> {
    console.log(accessToken)
    return false
  }
}
