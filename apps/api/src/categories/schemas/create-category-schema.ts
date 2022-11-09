import * as joi from 'joi'

export const createCategorySchema = joi.object({
  name: joi.string().required(),
  type: joi.string().valid('income', 'expense')
})
