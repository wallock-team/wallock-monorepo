import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  HttpCode
} from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Between } from 'typeorm'
import { AuthenticatedRequest } from '../commons'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}


  @Post()
  async createTransaction(
    @Req() req: AuthenticatedRequest,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    createTransactionDto.date = new Date()
    return await this.transactionsService.create(req.user, createTransactionDto)
  }

  @Patch()
  async updateTransaction(
    @Req() req: AuthenticatedRequest,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    updateTransactionDto.date = new Date(updateTransactionDto.date)
    return await this.transactionsService.update(updateTransactionDto, req.user)
  }

  @Delete(':id')
  @HttpCode(204)
  async delTransaction(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number
  ) {
    return await this.transactionsService.remove(req.user, id)
  }

  @Get()
  async getAllTransaction(
    @Req() req: AuthenticatedRequest,
    @Query('includes-deleted') includesDeleted?: boolean
  ) {
    return await this.transactionsService.findAllByUserId(
      req.user,
      includesDeleted
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
