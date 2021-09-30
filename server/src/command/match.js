const Joi = require('joi');

const createMatch = Joi.object({
    users: Joi.array()
            .min(2)
            .max(2)
            .items(Joi.string().alphanum().required())
            .required()
});

module.exports = {
    createMatch
}