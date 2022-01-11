const { Router } = require('express')

const { router: accountRouter } = require('./account/account.routes')
const { router: userRouter } = require('./user/user.routes')

const router = Router()

/**
 * GET v1.0/status
 */
router.get('/status', (req, res) => {
  res.json({ status: 'OK' })
})

router.use('/', accountRouter)
router.use('/', userRouter)

module.exports = {
  router
}
