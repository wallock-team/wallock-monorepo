import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UsePipes
} from '@nestjs/common'
import {
  CreateWalletDto,
  ReadWalletDto,
  RestResponse,
  UpdateWalletDto
} from 'dtos'
import { omit } from 'lodash'
import { AuthenticatedRequest } from 'src/commons'
import { JoiValidationPipe } from '../common/joi-validation-pipe'
import { createWalletDto } from './schemas/create-wallet-schema'
import { WalletsService } from './wallets.service'

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createWalletDto))
  async createWallet(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateWalletDto
  ): Promise<RestResponse<ReadWalletDto>> {
    return {
      message: 'Created wallet successfully',
      data: omit(
        await this.walletsService.createWallet(req.user, dto),
        'userId',
        'deletedAt',
        'version'
      )
    }
  }

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
