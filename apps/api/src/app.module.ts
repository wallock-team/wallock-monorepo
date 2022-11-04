import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from './users/entities/user.entity'
import { Category } from './categories/entities/category.entity'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import AuthController from './auth/auth.controller'
import { UsersController } from './users/users.controller'
import { CategoriesModule } from './categories/categories.module'
import { CategoriesController } from './categories/categories.controller'
import { TransactionsModule } from './transactions/transactions.module'
import { DbModule } from './db'
@Module({
  imports: [
    DbModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    TransactionsModule
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    CategoriesController
  ]
})
export class AppModule {}
