import { ErrorMessage } from '../error/errorMessage'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(opts?: FindOneOptions) {
    let user = await this.usersRepository.findOne(opts)
    if (user) {
      return user
    }
    throw new Error(ErrorMessage.NotFoundUser)
  }

  async update(updateUserDto: UpdateUserDto, userId: number) {
    const find_user = await this.usersRepository.findOne({
      where: { id: userId }
    })
    if (find_user) {
      await this.usersRepository.update(find_user.id, updateUserDto)
      return await this.usersRepository.findOne({
        where: { id: userId }
      })
    }
  }
}
