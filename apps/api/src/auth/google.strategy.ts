import { forwardRef, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Request } from 'express'
import {
  Profile,
  Strategy,
  StrategyOptionsWithRequest
} from 'passport-google-oauth20'

import { EnvService } from 'src/env'
import { User } from 'src/users'

import { AuthService } from './auth.service'

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(forwardRef(() => EnvService))
    envService: EnvService,
    private readonly authService: AuthService
  ) {
    const strategyOpts: StrategyOptionsWithRequest = {
      clientID: envService.oidc.google.clientId,
      clientSecret: envService.oidc.google.clientSecret,
      scope: ['openid', 'profile'],
      callbackURL: `${envService.baseUrl}/login-with-google`,
      passReqToCallback: true
    }

    super(strategyOpts)
  }

  async validate(
    req: Request,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<User | false> {
    const { user, jwt } = await this.authService.loginOrSignUpFromGoogle(
      profile
    )

    req.res.cookie('jwt', jwt, { httpOnly: true })

    return user
  }
}
