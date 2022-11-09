import { InjectRepository } from '@nestjs/typeorm'
import { CreateWalletDto } from 'dtos'
import { Repository } from 'typeorm'
import { User } from '../users'
import { Wallet } from './entities/wallet.entity'
import { WalletNameAlreadyExistsError } from './errors'

export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private readonly walletsRepo: Repository<Wallet>
  ) {}

  public async createWallet(user: User, dto: CreateWalletDto): Promise<Wallet> {
    const nameAlreadyExists = !!(await this.findWalletByName(user, dto.name))

    if (nameAlreadyExists) {
      throw new WalletNameAlreadyExistsError(dto.name)
    }

    await this.walletsRepo.insert({ ...dto, userId: user.id })

    return await this.findWalletByName(user, dto.name)
  }

  public async findWalletByName(
    user: User,
    name: string
  ): Promise<Wallet | null> {
    return this.walletsRepo.findOneBy({
      name,
      user: {
        id: user.id
      }
    })
  }
}
