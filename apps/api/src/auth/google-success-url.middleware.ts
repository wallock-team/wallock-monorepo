import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { required } from 'joi'

@Injectable()
export class GoogleSuccesUrlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const successUrl = req.query?.['success_url']
    if (successUrl) {
      res.cookie('succes_url', successUrl)
    }
    next()
  }
}
