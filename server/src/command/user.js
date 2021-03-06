const Joi = require('joi');

const createUser = Joi.object({
    id: Joi.string()
        .alphanum()
        .required()
});

const updateUser = Joi.object({
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
    bio: Joi.string(),
    avatarUrl: Joi.string().uri({
        scheme: [
            'http',
            'https'
        ]
    })
});

const replaceUserProfile = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    dob: Joi.date().required(),
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
    updateUser,
    createUserProfile,
    updateUserProfile,
    replaceUserProfile,
    createUserMatch,
    matchDecisionCommand
}