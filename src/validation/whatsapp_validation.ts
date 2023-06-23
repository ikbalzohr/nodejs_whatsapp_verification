import Joi from 'joi'

export const verifyCodeValidation = (payload: any): any => {
  const schema = Joi.object({
    phone: Joi.number().required()
  })

  return schema.validate(payload)
}
