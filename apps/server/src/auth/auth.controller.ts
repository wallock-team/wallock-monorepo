import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import JwtAuthGuard from './jwt-auth.guard'
import GoogleOidcAuthGuard from './google-oidc-auth.guard'
import MockOidcAuthGuard from './mock-oidc-auth.guard'
import { Response, Request } from 'express'
import { ConfigService } from '@nestjs/config'
import GoogleAuthGuard from './google-auth.guard'

@Controller()
export default class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/login-with-google')
  loginWithGoogle() {}

  @UseGuards(JwtAuthGuard)
  @Get('/auth/am-i-logged-in')
  amILoggedIn(@Req() req: any) {
    return req.user
  }

  @Get('/auth/login/social-login/:issuer')
  socialLogin(
    @Param('issuer') issuer: string,
    @Query('authorized_uri') authorizedUri: string,
    @Res() res: Response
  ) {
    const loginUrl = `${this.configService.getOrThrow<string>(
      'API_URL'
    )}/auth/login-with-${issuer}`

    res.cookie('authorized_uri', authorizedUri)
    res.redirect(loginUrl)
  }

  @UseGuards(GoogleOidcAuthGuard)
  @Get('/auth/login-with-google')
  _loginWithGoogle() {}

  @UseGuards(MockOidcAuthGuard)
  @Get('login-with-mock')
  loginWithMock() {}

  @Get('/auth/greet')
  @UseGuards(JwtAuthGuard)
  async greet(@Req() req: Request) {
    return req.user
  }
}
