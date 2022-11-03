import { ErrorMessage } from '../error/errorMessage'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateUserDto as OldCreateUserDto } from './dto/create-user.dto'
import CreateUserDto from 'src/../../packages/dtos/users/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserAlreadyExistsError } from './errors'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const userAlreadyExists = Boolean(
      await this.findUserByIssAndSub({
        iss: dto.iss,
        sub: dto.sub
      })
    )

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError(dto)
    }

    await this.usersRepository.insert(dto)

    return await this.findUserByIssAndSub(dto)
  }

  async create(createUserDto: OldCreateUserDto) {
    const user = await this.usersRepository.findOne({
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
      let user = await this.usersRepository.save(createUserDto)
      return user
    }
  }

  async findOne(opts?: FindOneOptions) {
    let user = await this.usersRepository.findOne(opts)
    if (user) {
      return user
    }
    throw new Error(ErrorMessage.NotFoundUser)
  }

  async findByIssAndSub(iss: string, sub: string) {
    return await this.usersRepository.findOne({ where: { iss: iss, sub: sub } })
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

  async findUserByIssAndSub({
    iss,
    sub
  }: {
    iss?: string
    sub?: string
  }): Promise<User | null> {
    if (!iss || !sub) return null

    return await this.usersRepository.findOneBy({
      iss,
      sub
    })
  }
}
