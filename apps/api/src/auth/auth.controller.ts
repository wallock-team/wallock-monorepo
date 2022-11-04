import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './google-auth.guard'
import { AuthenticatedRequest } from 'src/commons'
import { ReadUserDto, RestResponse } from 'dtos'
import { omit } from 'lodash'

@Controller()
export default class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('/login-with-google')
  loginWithGoogle(@Req() req: AuthenticatedRequest): RestResponse<ReadUserDto> {
    return {
      message: `Logged in successfully with Google! Welcome back, ${req.user.fullName}!`,
      data: omit(req.user, 'deletedAt', 'version')
    }
  }
}
