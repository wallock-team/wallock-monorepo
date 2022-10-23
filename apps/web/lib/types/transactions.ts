import { BaseEntity } from './base-entity'
import { Category } from './categories'
import { User } from './users'

export type CreateTransactionDto = {
  amount: number
  categoryId?: number
  note?: string
  date?: Date
}

export type UpdateTransactionDto = Partial<CreateTransactionDto> & {
  id: number
}

export type Transaction = BaseEntity & {
  amount: number
  note?: string
  date: Date
  categories: Category
  user: User
}
