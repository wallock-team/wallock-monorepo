import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvModule, EnvService } from 'src/env'
import { User } from 'src/users'

import AuthController from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './google.strategy'

const TWO_HOURS = 2 * 60 * 60 * 1000

@Module({
  imports: [
    PassportModule,
    EnvModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.jwtSecret,
        signOptions: { expiresIn: TWO_HOURS }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
