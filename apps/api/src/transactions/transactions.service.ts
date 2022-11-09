import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CategoriesService } from '../categories/categories.service'
import { UsersService } from '../users/users.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Transaction } from './entities/transaction.entity'
import { User } from '../users/entities/user.entity'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private userService: UsersService,
    private cateService: CategoriesService
  ) {}

  async find(options?: FindManyOptions<Transaction>) {
    return await this.transactionRepository.find(options)
  }

  async findAllByUserId(user: User, includesDeleted?: boolean) {
    const findUser = await this.userService.findOne({
      where: {
        id: user.id
      }
    })

    if (!findUser) {
      throw new NotFoundException('Can not find user')
    }

    return await this.transactionRepository.find({
      relations: {
        category: true
      },
      where: {
        user: {
          id: user.id
        }
      },
      withDeleted: includesDeleted
    })
  }

  async findByIdForUser(user: User, id: number): Promise<Transaction> {
    let transaction = await this.transactionRepository.findOne({
      relations: {
        category: true
      },
      where: {
        id: id
      }
    })
    if (!transaction) throw new NotFoundException('Not found transaction')
    return transaction
  }
}
