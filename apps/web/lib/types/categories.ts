import { BaseEntity } from './base-entity'
import { User } from './users'

export type CreateCategoryDto = {
  name: string
  type: 'income' | 'expense'
  group: string
}

export type UpdateCategoryDto = {
  id: number
  name?: string
  group?: string
}

export type Category = BaseEntity & {
  name: string
  type: 'income' | 'expense'
  group: string
  icon?: string
  user: User
}
