const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const validateOptions = {
  abortEarly: false, // include all errors
  presence: 'required'
}

const formatError = (error, source) => {
  const { details } = error
  const message = details.map((item) => item.message).join('. ')
  const keys = details.map((item) => item.context.key)

  return {
    errors: [{
      status: StatusCodes.BAD_REQUEST,
      title: ReasonPhrases.BAD_REQUEST,
      details: message,
      validation: {
        source,
        keys
      }
    }]
  }
}

const validate = (schema) => {
  return (req, res, next) => {
    if (schema.params !== undefined) {
      const { error } = schema.params.validate(req.params, validateOptions)

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(formatError(error, 'params'))
      }
    }

    if (schema.payload !== undefined) {
      const { error } = schema.payload.validate(req.body, validateOptions)

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(formatError(error, 'payload'))
      }
    }

    next()
  }
}

module.exports = {
  validate
}
