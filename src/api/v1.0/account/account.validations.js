const Joi = require('joi')

const account = Joi.object({
  name: Joi.string().required(),
  logo: Joi.string().required(),
  type: Joi.string().valid('Business', 'Personal').default('Personal')
}).unknown(false)

const accountId = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required()
})

module.exports = {
  // POST /v1.0/accounts
  create: {
    payload: account
  },
  deleteDyId: {
    // DELETE /v1.0/accounts/:id
    params: accountId
  },
  getById: {
    // GET /v1.0/accounts/:id
    params: accountId
  },
  // PATCH /v1.0/accounts/:id
  update: {
    params: accountId,
    payload: account
  }
}
