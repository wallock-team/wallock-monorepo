import { ReadCategoryDto } from '../categories/read-category.dto'
import { BaseDto } from '../common/base.dto'

export type ReadTransactionDto = {
  amount: number
  note: String
  date: Date
  category: ReadCategoryDto
} & BaseDto
