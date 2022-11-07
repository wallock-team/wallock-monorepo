import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import { omit } from 'lodash'
import { Response } from 'express'

import { ReadUserDto, RestResponse } from 'dtos'

import { AuthenticatedRequest } from 'src/commons'
import { Public } from 'src/common/public-url'

import { GoogleAuthGuard } from './google-auth.guard'

@Controller()
export default class AuthController {
  @Get('/login-with-google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): RestResponse<ReadUserDto> {
    const dataToReturn = {
      message: `Logged in successfully with Google! Welcome back, ${req.user.fullName}!`,
      data: omit(req.user, 'deletedAt', 'version')
    }

    if (req.cookies.succes_url) {
      const succesUrl = req.cookies.succes_url
      res.clearCookie('succes_url')
      res.redirect(succesUrl)
    }

    return dataToReturn
  }
}
