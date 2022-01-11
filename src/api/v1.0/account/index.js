const controller = require('./account.controller')
const router = require('./account.routes')
const validations = require('./account.validations')

module.exports = {
  controller,
  router,
  validations
}
