const Joi = require('joi');

const {CONST} = require('../configs');

const authValidate = Joi.object({
    email: Joi
        .string()
        .regex(CONST.EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi
        .string()
        .regex(CONST.PASSWORD_REGEXP)
        .required()
        .trim()
});

module.exports = {authValidate};
