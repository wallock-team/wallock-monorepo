import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { CreateWalletDto, RestResponse, UpdateWalletDto } from 'dtos'
import { AuthenticatedRequest } from 'src/commons'

@Controller()
export class WalletsController {
  @Post()
  createWallet(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateWalletDto
  ) {}

  @Patch(':id')
  updateWallet(
    @Req() req: AuthenticatedRequest,
    @Query('id') walletId: number,
    @Body() dto: UpdateWalletDto
  ): RestResponse<UpdateWalletDto> {
    return {
      message: ''
    }
  }

  @Get()
  getAllWallets() {}

  @Get(':id')
  getWallet() {}
}
