import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import AuthController from './auth.controller'
import { AuthService } from './auth.service'
import { EnvModule } from 'src/env/env.module'
import { GoogleStrategy } from './google.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users'
@Module({
  imports: [PassportModule, EnvModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
