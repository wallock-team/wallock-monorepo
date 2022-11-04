import { forwardRef, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20'
import { EnvService } from 'src/env'
import { User } from 'src/users'
import { AuthService } from './auth.service'

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
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
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<User | false> {
    return await this.authService.loginOrSignUpFromGoogle(profile)
  }
}
