import { Controller, Get, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { Request } from 'express'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async findOne(@Req() req: Request) {
    if (req.user) return req.user
  }
}
