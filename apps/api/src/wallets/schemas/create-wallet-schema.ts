import * as joi from 'joi'

export const createWalletDto = joi.object({
  name: joi.string().min(1).required()
})
