const Joi = require('joi');

const createMatch = Joi.object({
    users: Joi.array()
            .min(2)
            .max(2)
            .items(Joi.string().alphanum().required())
            .required()
});

const replaceMatch = Joi.object({
    users: Joi.array()
        .min(2)
        .max(2)
        .items(Joi.string().alphanum().required())
        .required()
})

const createMatchMessage = Joi.object({
    sender: Joi.string()
        .alphanum()
        .required(),
    content: Joi.string()
        .min(1)
        .required()
});

module.exports = {
    createMatch,
    replaceMatch,
    createMatchMessage
}