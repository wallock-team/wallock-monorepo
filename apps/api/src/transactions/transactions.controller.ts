import { Controller, Get, Param, Req } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { AuthenticatedRequest } from '../commons'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':id')
  async getTransaction(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number
  ) {
    return await this.transactionsService.findByIdForUser(req.user, id)
  }
}
