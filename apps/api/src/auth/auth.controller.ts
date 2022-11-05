import { Controller, Post, Req, UseGuards } from '@nestjs/common'

import { omit } from 'lodash'

import { ReadUserDto, RestResponse } from 'dtos'

import { AuthenticatedRequest } from 'src/commons'
import { Public } from 'src/common/public-url'

import { GoogleAuthGuard } from './google-auth.guard'

@Controller()
export default class AuthController {
  @Post('/login-with-google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle(@Req() req: AuthenticatedRequest): RestResponse<ReadUserDto> {
    return {
      message: `Logged in successfully with Google! Welcome back, ${req.user.fullName}!`,
      data: omit(req.user, 'deletedAt', 'version')
    }
  }
}
