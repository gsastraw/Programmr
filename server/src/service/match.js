const Match = require('../model/match');
const User = require('../model').User;
const UserService = require('../service/user');

const checkIfMatched = async (userId, matchedId) => {
    try {
        let currentUser = await User.findOne({ liked: matchedId } );
        let matchedUser = await User.findOne( { liked: userId } );

        if (!currentUser || !matchedUser) {
            return Promise.reject("Could not find a match between these two users!")
        }
    } catch (err) {
        await createMatch(userId, matchedId);
    }
}

const createMatch = async (userId, matchedId) => {
    try {
        let currentUser = await UserService.getUser(userId);
        let matchedUser = await UserService.getUser(matchedId);

        if (!currentUser || !matchedUser) {
            return Promise.reject(`Could not create a match between these two IDs!`)
        }
    } catch (err) {
        await Match.create({ profiles: userId, matchedId });
    }
}

const MatchService = {
    checkIfMatched,
    createMatch
};

module.exports = MatchService;