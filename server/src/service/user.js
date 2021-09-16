const _ = require('lodash');

const User = require('../model').User;

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

const listUsers = async (page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) => {
    if (isNaN(page)) {
        return Promise.reject(`Page must be a number (value = ${page})`);
    }

    if (isNaN(pageSize)) {
        return Promise.reject(`Page size must be a number (value = ${pageSize})`);
    }

    if (page < 1) {
        return Promise.reject(`Page can't be lower than 1 (value = ${page})`);
    }

    if (pageSize < 0) {
        return Promise.reject(`Page size can't be lower than 0 (value = ${pageSize})`);
    }

    return User.find()
        .limit(pageSize)
        .skip(page - 1)
        .exec();
};

const getUser = async (id) => {
    if (!id) {
        throw "Id not defined";
    }

    const user = await User.findOne({ googleId: id }, { '_id': 0, '__v': 0 }).exec(); 

    if (!user) {
        return Promise.reject(`User with id '${id}' not found`)
    }

    return user;
};

const createUser = async (id) => {
    try {
        await getUser(id);

        return Promise.reject(`User with id ${id} already exists`);
    } catch (error) {
        return User.create({ googleId: id });
    }
};

const deleteUser = async (id) => {
    try {
        await getUser(id);

        return User.deleteOne({ googleId: id });
    } catch (error) {
        return Promise.reject(`User with id ${id} not found`);
    }
}

const getUserProfile = async (id) => {
    try {
        const user = await getUser(id);

        if (!user.profile) {                
            return Promise.reject(`Profile for user with id ${id} not found`);
        }

        return user.profile;
    } catch (error) {
        return Promise.reject(`User with id '${id}' not found`);
    }
}

const createUserProfile = async (id, details) => {
    try {
        const user = await getUser(id);

        if (user.profile) {
            return Promise.reject(`Profile for user with id '${id}' already exists`);
        }

        const command = _.pick(details, 'firstName', 'lastName', 'dob', 'location', 'bio', 'avatarUrl');

        return User.updateOne({ googleId: id }, {profile: command}).exec();
    } catch (error) {
        return Promise.reject(`User with id '${id}' not found`);
    }
};

const updateUserProfile = async (id, details) => {
    try {
        const user = await getUser(id);

        if (!user.profile) {
            return Promise.reject(`Profile for user with id '${id}' not found`);
        }

        const command = _.pick(details, 'firstName', 'lastName', 'dob', 'location', 'bio', 'avatarUrl');

        return User.updateOne({ googleId: id }, {profile: command}).exec();
    } catch (error) {
        return Promise.reject(`User with id '${id}' not found`);
    }
};

const UserService = {
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    listUsers,
    getUser,
    createUser,
    deleteUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile
};

module.exports = UserService;