import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20'
import { EnvService } from 'src/env'
import { User } from 'src/users'
import { AuthService } from './auth.service'

const STRATEGY_NAME = 'google'

const FailedAuth = false

@Injectable()
export class GoogleAuthGuard extends AuthGuard(STRATEGY_NAME) {}

export class GoogleStrategy extends PassportStrategy(Strategy, STRATEGY_NAME) {
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
  ): Promise<User | typeof FailedAuth> {
    const user = await this.authService.loginOrSignUpFromGoogle(profile)

    if (!user) {
      return FailedAuth
    } else {
      return user
    }
  }
}
