import { ErrorMessage } from '../error/errorMessage'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { CategoriesService } from '../categories/categories.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        iss: createUserDto.iss,
        sub: createUserDto.sub
      }
    })

    if (user) {
      //TO DO throw other exception
      throw new ConflictException(
        `User with iss '${createUserDto.iss}' and sub '${createUserDto.sub}' is already created`
      )
    } else {
      let user = await this.userRepository.save(createUserDto)
      return user
    }
  }

  async findOne(opts?: FindOneOptions) {
    let user = await this.userRepository.findOne(opts)
    if (user) {
      return user
    }
    throw new Error(ErrorMessage.NotFoundUser)
  }

  async findByIssAndSub(iss: string, sub: string) {
    return await this.userRepository.findOne({ where: { iss: iss, sub: sub } })
  }

  async update(updateUserDto: UpdateUserDto, userId: number) {
    const find_user = await this.userRepository.findOne({
      where: { id: userId }
    })
    if (find_user) {
      await this.userRepository.update(find_user.id, updateUserDto)
      return await this.userRepository.findOne({
        where: { id: userId }
      })
    }
  }

  async findUserByIssAndSub({
    iss,
    sub
  }: {
    iss?: string
    sub?: string
  }): Promise<User | null> {
    if (!iss || !sub) return null

    return await this.userRepository.findOneBy({
      iss,
      sub
    })
  }
}
