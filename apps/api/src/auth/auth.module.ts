import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import AuthController from './auth.controller'
import { AuthService } from './auth.service'
import { EnvModule } from 'src/env/env.module'
import { GoogleStrategy } from './google.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OpenId } from './entities/open-id.entity'
@Module({
  imports: [PassportModule, EnvModule, TypeOrmModule.forFeature([OpenId])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
