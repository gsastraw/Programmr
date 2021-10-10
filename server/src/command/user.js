const Joi = require('joi');

const createUser = Joi.object({
    id: Joi.string()
        .alphanum()
        .required()
});

const createUserProfile = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    dob: Joi.date()
        .required(),
    location: Joi.object({
        long: Joi.number().required(), 
        lat: Joi.number().required()
    }).required(),
    bio: Joi.string(),
    avatarUrl: Joi.string().uri({
        scheme: [
            'http',
            'https'
        ]
    })
});

const updateUserProfile = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(1),
    lastName: Joi.string()
        .alphanum()
        .min(1),
    dob: Joi.date(),
    location: Joi.object({
        long: Joi.number().required(), 
        lat: Joi.number().required()
    }),
    bio: Joi.string(),
    avatarUrl: Joi.string().uri({
        scheme: [
            'http',
            'https'
        ]
    })
});

const createUserMatch = Joi.object({
    id: Joi.string()
        .alphanum()
        .required()
});

const matchDecisionCommand = Joi.object({
    id: Joi.string()
        .alphanum()
        .required(),
    status: Joi.string()
        .valid('accept', 'reject')
        .required()
});

module.exports = {
    createUser,
    createUserProfile,
    updateUserProfile,
    createUserMatch,
    matchDecisionCommand
}