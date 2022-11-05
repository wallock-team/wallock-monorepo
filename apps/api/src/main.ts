import { NestFactory } from '@nestjs/core'

import cookieParser from 'cookie-parser'
import session from 'express-session'

import { AppModule } from './app.module'
import { EnvService } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const env = app.get<EnvService>(EnvService).env

  const cookieMiddleware = cookieParser(env.secrets.cookie)

  const ONE_HOUR = 60 * 60 * 1000
  const sessionMiddleware = session({
    secret: env.secrets.session,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: ONE_HOUR,
      httpOnly: true,
      secure: env.env === 'prod'
    }
  })

  const corsSettings = {
    credentials: true,
    origin: [env.webUrl]
  }

  app.use(cookieMiddleware).use(sessionMiddleware).enableCors(corsSettings)

  await app.listen(3000)
}
bootstrap()
