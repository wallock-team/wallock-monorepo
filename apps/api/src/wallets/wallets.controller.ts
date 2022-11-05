import { Controller, Get, Patch, Post } from '@nestjs/common'

@Controller()
export class WalletsController {
  @Post()
  createWallet() {}

  @Patch(':id')
  updateWallet() {}

  @Get()
  getAllWallets() {}

  @Get(':id')
  getWallet() {}
}
