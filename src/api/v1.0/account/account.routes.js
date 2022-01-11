const express = require('express')

const { validate } = require('../../../utils')

const controller = require('./account.controller')
const validations = require('./account.validations')

const router = express.Router({
  strict: true
})

router.post('/accounts', validate(validations.create), controller.create)

router.get('/accounts', controller.getAll)

router.get('/accounts/:id', validate(validations.getById), controller.getById)

router.delete('/accounts/:id', validate(validations.deleteDyId), controller.deleteById)

router.patch('/accounts/:id', validate(validations.update), controller.update)

module.exports = {
  router
}
