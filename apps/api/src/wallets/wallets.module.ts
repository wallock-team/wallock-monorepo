import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wallet } from './entities/wallet.entity'
import { WalletsController } from './wallets.controller'
import { WalletsService } from './wallets.service'

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletsService],
  controllers: [WalletsController]
})
export class WalletsModule {}
