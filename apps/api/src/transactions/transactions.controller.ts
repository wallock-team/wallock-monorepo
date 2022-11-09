import { Controller, Get, Param, Req } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { AuthenticatedRequest } from '../commons'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAllTransactions(@Req() req: AuthenticatedRequest) {
    return (await this.transactionsService.getAllTransactions(req.user)).sort(
      (transaction1, transaction2) =>
        +(transaction1.date.getTime() > transaction2.date.getTime())
    )
  }

  @Get(':id')
  async getTransaction(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number
  ) {
    return await this.transactionsService.findByIdForUser(req.user, id)
  }
}
