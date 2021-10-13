const Match = require('../model/match');
const UserService = require('../service/user');

const HttpError = require('../httpError');

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

const listMatches = async (page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) => {
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

    return Match.find({}, '-messages')
        .limit(pageSize)
        .skip(page - 1)
        .exec();
};

const deleteMatches = async () => {
    return Match.deleteMany({}).exec();
}

const getMatch = async (id) => {
    if (!id) {
        return Promise.reject(new HttpError("Id not defined", 400));
    }

    const match = await Match.findById(id, '-messages').exec()

    if (!match) {
        return Promise.reject(new HttpError(`Match with id '${id}' not found`, 404));
    }

    return match;
}

const createMatch = async (userId1, userId2) => {
    if (!userId1 || !userId2) {
        return Promise.reject(new HttpError("UserId not defined", 400))
    }

    try {
        const user1 = await UserService.getUser(userId1);
        const user2 = await UserService.getUser(userId2);

        const matchExists = await Match.exists({ profiles: { $all: [user1._id, user2._id] } });

        if (matchExists) {
            return Promise.reject(new HttpError(`Match for users with id '${userId1}' and '${userId2}' already exists`, 400));
        }

        return Match.create({ profiles: [user1._id, user2._id] });
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteMatch = async (id) => {
    try {
        await getMatch(id);

        return Match.deleteOne({ _id: id });
    } catch (error) {
        return Promise.reject(new HttpError(`Match with id '${id}' not found`, 404));
    }
}

const getMatchesForUser = async (userId, page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) => {
    if (!userId) {
        return Promise.reject(new HttpError('UserId not defined', 400))
    }

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

    try {
        const user = await UserService.getUser(userId);

        return Match.find({ profiles: user._id }, '-messages')
            .limit(pageSize)
            .skip(page - 1)
            .exec();
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteMatchesForUser = async (userId) => {
    if (!userId) {
        return Promise.reject(new HttpError('UserId not defined', 400))
    }

    try {
        const user = await UserService.getUser(userId);

        return Match.deleteMany({ profiles: user._id }).exec();
    } catch (error) {
        return Promise.reject(error);
    }
}

const getMatchForUser = async (userId, matchId) => {
    if (!userId) {
        return Promise.reject(new HttpError('UserId not defined', 400))
    }

    if (!matchId) {
        return Promise.reject(new HttpError('MatchId not defined', 400))
    }

    try {
        const user = await UserService.getUser(userId);

        const match = await Match.findOne({ profiles: user._id, _id: matchId }, '-messages').exec();

        if (!match) {
            return Promise.reject(new HttpError(`Match with id '${matchId}' not found for user with id '${userId}'`, 404));
        }

        return match;
    } catch (error) {
        return Promise.reject(error);
    }
}

const getMatchMessages = async (id) => {
    if (!id) {
        return Promise.reject(new HttpError("Id not defined", 400));
    }

    const match = await Match.findById(id, 'messages').exec()

    if (!match) {
        return Promise.reject(new HttpError(`Match with id '${id}' not found`, 404));
    }

    // TODO: Should probably be paginated
    return match.messages;
}

const createMatchMessage = async (id, sender, content) => {
    if (!id) {
        return Promise.reject(new HttpError("Id not defined", 400));
    }

    const match = await Match.findById(id).exec()

    if (!match) {
        return Promise.reject(new HttpError(`Match with id '${id}' not found`, 404));
    }

    try {
        const user = await UserService.getUser(sender);

        match.addMessage(user._id, content);

        return Promise.resolve();
    } catch(error) {
        return Promise.reject(error);
    }
}

const MatchService = {
    listMatches,
    deleteMatches,
    getMatch,
    createMatch,
    deleteMatch,
    getMatchesForUser,
    deleteMatchesForUser,
    getMatchForUser,
    getMatchMessages,
    createMatchMessage
}

module.exports = MatchService;