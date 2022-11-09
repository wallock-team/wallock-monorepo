import { BaseDto } from '../common/base.dto'
import { CategoryType } from './category-type'

export type ReadCategoryDto = {
  name: string
  type: CategoryType
} & BaseDto
