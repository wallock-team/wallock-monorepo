import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './google-auth.guard'
import { AuthenticatedRequest } from 'src/commons'
import { RestResponse } from 'dtos'
import { User } from 'src/users'

@Controller()
export default class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('/login-with-google')
  loginWithGoogle(@Req() req: AuthenticatedRequest): RestResponse<User> {
    return {
      message: 'Logged in successfully with Google',
      data: req.user
    }
  }
}
