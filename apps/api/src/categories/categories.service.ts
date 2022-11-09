import { Injectable } from '@nestjs/common'
import {
  CategoryNotBelongToUserError,
  CategoryAlreadyExistsError
} from './dto/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryType, CreateCategoryDto } from 'dtos'
import { Category } from './entities/category.entity'
import initialCategories from './initialCategories.json'
import { User } from '../users/entities/user.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
  ) {}

  async createCategory(user: User, dto: CreateCategoryDto): Promise<Category> {
    const categoryAlreadyExists = await this.findCategoryByNameAndType(
      user,
      dto.name,
      dto.type
    )

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError(dto.name, dto.type)
    }

    await this.categoryRepo.insert({
      ...dto,
      user: {
        id: user.id
      }
    })

    return await this.findCategoryByNameAndType(user, dto.name, dto.type)
  }

  async createInitCate(user: User) {
    await this.categoryRepo.insert(
      initialCategories.map(c => ({
        user: user,
        ...c,
        type: c.type as 'expense' | 'income'
      }))
    )
  }

  public async findCategoryById(user: User, id: number): Promise<Category> {
    const category = await this.categoryRepo.findOneBy({ id })

    if (category.user.id !== user.id) {
      throw new CategoryNotBelongToUserError()
    }

    return category
  }

  public async findCategoryByNameAndType(
    user: User,
    name: string,
    type: CategoryType
  ): Promise<Category | null> {
    return await this.categoryRepo.findOneBy({
      name,
      type,
      userId: user.id
    })
  }
}
