import { Controller, Body, Patch, Get, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Request } from 'express'
import { AuthenticatedRequest } from '../commons'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async findOne(@Req() req: Request) {
    if (req.user) return req.user
  }

  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest
  ) {
    let userId = req.user.id
    return await this.usersService.update(updateUserDto, userId)
  }
}
