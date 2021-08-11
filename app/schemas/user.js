const Joi = require('joi');

const schema = Joi.object({
    id: Joi.number().integer().optional(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required,
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')),
    repeat_password: Joi.ref('password'),
    access_token: [
        Joi.string(),
        Joi.number()
    ],
    jwt: Joi.string()
        .alphanum()
        .min(3)
        .max(200)
        .required()
});

module.exports = schema;