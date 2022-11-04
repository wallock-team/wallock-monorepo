import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvService, envValidation } from '.'

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      validationSchema: envValidation
    })
  ],
  providers: [EnvService],
  exports: [EnvService]
})
export class EnvModule {}
