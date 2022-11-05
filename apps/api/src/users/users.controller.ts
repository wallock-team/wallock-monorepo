import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { Request } from 'express'
import { AuthenticatedRequest } from '../commons'
import { ReadUserDto, RestResponse } from 'dtos'
import { omit } from 'lodash'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller()
export class UsersController {
  constructor() {}

  @Get('/me')
  getProfile(@Req() req: AuthenticatedRequest): RestResponse<ReadUserDto> {
    return {
      message: 'Get your profile successfully',
      data: omit(req.user, 'deletedAt', 'version')
    }
  }
}
