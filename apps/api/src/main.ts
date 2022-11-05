import { NestFactory } from '@nestjs/core'

import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { EnvService } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const env = app.get<EnvService>(EnvService)

  const CookieParser = cookieParser()

  await app.listen(3000)
}
bootstrap()
