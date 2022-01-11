const controller = require('./user.controller')
const router = require('./user.routes')
const validations = require('./user.validations')

module.exports = {
  controller,
  validations,
  router
}
