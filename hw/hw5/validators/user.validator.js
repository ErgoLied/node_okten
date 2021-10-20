const Joi = require('joi');

const {CONST, USR_ROLE} = require('../configs');

const userValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(CONST.EMAIL_REGEXP)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(USR_ROLE)),
    password: Joi
        .string()
        .regex(CONST.PASSWORD_REGEXP)
        .required()
        .trim()
});

module.exports = {userValidator};
