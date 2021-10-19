const _ = require('lodash');

const User = require('../model').User;
const Match = require('../model').Match;
const HttpError = require('../httpError');

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

const listUsers = async (page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) => {
    if (isNaN(page)) {
        return Promise.reject(new HttpError(`Page must be a number (value = ${page})`, 400));
    }

    if (isNaN(pageSize)) {
        return Promise.reject(new HttpError(`Page size must be a number (value = ${pageSize})`, 400));
    }

    if (page < 1) {
        return Promise.reject(new HttpError(`Page can't be lower than 1 (value = ${page})`, 400));
    }

    if (pageSize < 0) {
        return Promise.reject(new HttpError(`Page size can't be lower than 0 (value = ${pageSize})`, 400));
    }

    return User.find()
        .limit(pageSize)
        .skip(page - 1)
        .exec();
};

const deleteUsers = async () => {
    // Mongoose pre hooks are not working for some reason, will have to delete referenced matches like this for now
    await Match.deleteMany({}).exec();
    return User.deleteMany({}).exec();
}

const getUser = async (id) => {
    if (!id) {
        return Promise.reject(new HttpError("Id not defined", 400));
    }

    const user = await User.findOne({ googleId: id }).exec(); 

    if (!user) {
        return Promise.reject(new HttpError(`User with id '${id}' not found`, 404));
    }

    return user;
};

const createUser = async (id) => {
    try {
        await getUser(id);

        return Promise.reject(new HttpError(`User with id ${id} already exists`, 400));
    } catch (error) {
        return User.create({ 
            googleId: id,
            matchInfo: {
                accepted: [],
                rejected: []
            }
        });
    }
};

const deleteUser = async (id) => {
    try {
        const user = await getUser(id);

        /**
         * TODO: Convert to transaction, currently not supported because our local 
         * mongo instances run as standalone servers instead of replica sets
         */
        await Match.deleteMany({ profiles: user._id }).exec();
        return User.deleteOne({ googleId: id });
    } catch (error) {
        return Promise.reject(error);
    }
}

const getUserProfile = async (id) => {
    try {
        const user = await getUser(id);

        if (!user.profile) {                
            return Promise.reject(new HttpError(`Profile for user with id ${id} not found`, 404));
        }

        return user.profile;
    } catch (error) {
        return Promise.reject(error);
    }
}

const createUserProfile = async (id, details) => {
    try {
        const user = await getUser(id);

        if (user.profile) {
            return Promise.reject(new HttpError(`Profile for user with id '${id}' already exists`, 400));
        }

        const command = _.pick(details, 'firstName', 'lastName', 'dob', 'bio', 'avatarUrl');

        return User.updateOne({ googleId: id }, {profile: command}).exec();
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateUserProfile = async (id, details) => {
    try {
        const user = await getUser(id);

        if (!user.profile) {
            return Promise.reject(new HttpError(`Profile for user with id '${id}' not found`, 404));
        }

        const command = _.pick(details, 'firstName', 'lastName', 'dob', 'bio', 'avatarUrl');

        const update = buildProfileUpdateParamters(command);

        return User.updateOne({ googleId: id }, { $set: update }).exec();
    } catch (error) {
        return Promise.reject(error);
    }
};

const buildProfileUpdateParamters = (command) => {
    const update = {};

    Object.keys(command).forEach((key) => {
        update[`profile.${key}`] = command[key];
    })

    return update;
}

const addMatchDecision = async (id, details) => {
    try {
        const user = await getUser(id);

        const command = _.pick(details, 'id', 'status');
        const {id: targetId, status} = command;

        const target = await getUser(targetId);

        if (user._id === target._id) {
            return Promise.reject(new HttpError(`User with id '${id}' can't be matched to itself`, 400));
        }

        if (user.hasMatchDecision(target._id)) {
            return Promise.reject(new HttpError(`User with id '${id}' already has match decision for user with id '${targetId}'`, 400));
        }

        user.addMatchDecision(target._id, status);

        if (target.hasMatchDecision(user._id)) {
            await Match.create({ profiles: [user._id, target._id] });

            return Promise.resolve({
                matched: true
            })
        }

        return Promise.resolve({
            matched: false
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

const getSuggestionsForUser = async (id) => {
    try {
        const user = await getUser(id);
        const matchInfo = user.matchInfo;

        return User.aggregate([
            { $sample: { size: DEFAULT_PAGE_SIZE } },
            { $project: { _id: 0, id: '$googleId', profile: 1 } },
            { $match: { $and: [
                { _id: { $ne: user._id } },
                { _id: { $nin: matchInfo.accepted } },
                { _id: { $nin: matchInfo.rejected } },
                { profile: { $exists: true } }
            ] } }
        ]).exec();
    } catch (error) {
        return Promise.reject(error);
    }
}

const UserService = {
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    listUsers,
    deleteUsers,
    getUser,
    createUser,
    deleteUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    addMatchDecision,
    getSuggestionsForUser
};

module.exports = UserService;