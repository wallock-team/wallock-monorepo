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
  @UseGuards(GoogleAuthGuard)
  @Get('/login-with-google')
  loginWithGoogle(@Req() req: AuthenticatedRequest): RestResponse<User> {
    return {
      message: ' Logged in successfully with Google',
      data: req.user
    }
  }
}
