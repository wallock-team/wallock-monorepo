import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { Response, Request } from 'express'
import { ConfigService } from '@nestjs/config'
import GoogleAuthGuard from './google-auth.guard'
import { AuthenticatedRequest } from '../commons'
import { RestResponse } from 'dtos'
import { User } from '../users/entities/user.entity'

@Controller()
export default class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/login-with-google')
  loginWithGoogle(@Req() req: AuthenticatedRequest): RestResponse<User> {
    return {
      message: ' Logged in successfully with Google',
      data: req.user
    }
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

}
