import { forwardRef, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile, StrategyOptions } from 'passport-google-oauth20'
import { EnvService } from 'src/env'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'

export default class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google'
) {
  constructor(
    @Inject(forwardRef(() => EnvService))
    envService: EnvService,
    private readonly authService: AuthService
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
    // Currently, `refresh_token` will always be undefined because we don't request it
    // This will be used later when implementing token refreshing feature
    _refreshToken: string,
    profile: Profile
  ): Promise<User | false> {
    return await this.authService.loginOrRegisterUserFromGoogle(profile)
  }
}
