import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { TransactionsModule } from './transactions/transactions.module'
import { DbModule } from './db'
import { WalletsModule } from './wallets/wallets.module'
import { AppController } from './app.controller'
@Module({
  imports: [
    DbModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    TransactionsModule,
    WalletsModule
  ],
  controllers: [AppController]
})
export class AppModule {}
