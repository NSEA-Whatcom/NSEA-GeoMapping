const Joi = require('joi');

const validationSchema = Joi.object({
  Username: Joi.string().alphanum().min(3).max(30).required(),
  Password: Joi.string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/),
})

module.exports = {
  signUp: validationSchema,
  signIn: validationSchema,
}