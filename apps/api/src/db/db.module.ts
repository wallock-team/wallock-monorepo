import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvModule, EnvService } from 'src/env'
import { User } from 'src/users'
import { Wallet } from 'src/wallets'
import { Category } from '../categories/entities/category.entity'
import { Transaction } from '../transactions/entities/transaction.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async function (envService: EnvService) {
        if (envService.env.env === 'dev') {
          return {
            type: 'better-sqlite3',
            database: ':memory:',
            synchronize: true,
            entities: [User, Wallet, Category, Transaction]
          }
        }
      }
    })
  ]
})
export class DbModule {}
