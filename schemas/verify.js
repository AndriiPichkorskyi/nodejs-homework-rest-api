const Joi = require("joi");

const verifySchema = Joi.object().keys({
  email: Joi.string()
    .pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required(),
});

module.exports = verifySchema;
