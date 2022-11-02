import * as joi from 'joi'

// This should be used to validate `process.env` object
const configSchema = joi.object({
  ENV: joi.string().valid('dev', 'prod').required(),
  PORT: joi.number().default(3000),
  OIDC_GOOGLE_CLIENT_ID: joi.string().required(),
  OIDC_GOOGLE_CLIENT_SECRET: joi.string().required()
})

export default configSchema
