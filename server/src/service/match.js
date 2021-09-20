const Match = require('../model/match');
const User = require('../model').User;
const UserService = require('../service/user');

const createMatch = async (userId, matchedId) => {
    /* When the suggested IDs are fetched from the match algorithm, this method first checks to see if the match already exists in the system.
       If the match already exists, a rejected Promise is returned. Otherwise, a Match is created that ties the user ID and the matched ID together.
    */
    try {
        const currentUser = await UserService.getUser(userId);
        const matchedUser = await UserService.getUser(matchedId);

        if (!currentUser || !matchedUser) {
            return Promise.reject(`Could not create a match between these two IDs!`)
        }

        if (checkIfMatchAlreadyExists(userId, matchedId)) {
            return Promise.reject("Match was already created!");
        }
    } catch (err) {
        Match.create({ profiles: userId, matchedId });
    }
}

const checkIfMatchAlreadyExists = (userId, matchedId) => {
    // A helper function that returns true if the match.profiles contains the swiper's ID and the swipee's ID, else returns false
    const match = Match.findOne( {  } ).exec();
    return match.profiles.includes(userId, matchedId);
}

const MatchService = {
    createMatch,
    checkIfMatchAlreadyExists
};

module.exports = MatchService;