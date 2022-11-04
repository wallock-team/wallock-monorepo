import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { EnvModule } from 'src/env/env.module'
import GoogleStrategy from './google.strategy'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PassportModule, UsersModule, EnvModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
