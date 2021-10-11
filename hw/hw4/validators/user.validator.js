const Joi = require('joi');

const {PASSWORD_REGEXP} = require('../configs/constants');

const createUserValidator = Joi.object({
    login: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim()
});

module.exports = {createUserValidator};
