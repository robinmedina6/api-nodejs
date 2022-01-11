const Joi = require("joi");

const user = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
}).unknown(false);

const userId = Joi.object({
  id: Joi.number().required(),
});

module.exports = {
  // POST /v1.0/users
  create: {
    payload: user,
  },
  deleteDyId: {
    // DELETE /v1.0/users/:id
    params: userId,
  },
  getById: {
    // GET /v1.0/users/:id
    params: userId,
  },
  // PATCH /v1.0/users/:id
  update: {
    params: userId,
    payload: Joi.object({
      name: Joi.string(),
      lastname: Joi.string(),
      password: Joi.string().min(8).max(36),
      age: Joi.number(),
      email: Joi.string().email({ minDomainSegments: 2 })
    }).unknown(false)
  },
};
