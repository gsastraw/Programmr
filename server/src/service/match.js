const Match = require('../model/match');
const User = require('../model').User;
const UserService = require('../service/user');

const createMatch = async (userId, matchedId) => {
    /* When the suggested IDs are fetched from the match algorithm, this method first checks to see if the match already exists in the system.
       If the match already exists, a rejected Promise is returned. Otherwise, a Match is created that ties the user ID and the matched ID together.
    */
    const currentUser = await UserService.getUser(userId);
    const matchedUser = await UserService.getUser(matchedId);

    if (!currentUser || !matchedUser) {
        return Promise.reject(`Could not create a match between these two IDs!`)
    }

    for (let i = 0; i < currentUser.liked.length; i++) {
        for (let j = 0; j < matchedUser.liked.length; j++) {
            if (currentUser.liked[i] == matchedId) {
                if (matchedUser.liked[j] == userId) {
                    Match.create({ profiles: userId, matchedId });
                }
            } else {
                return Promise.reject(`Two users need to match with each other in order to create a match!`)
            }
        }
    }
}

const fetchMatchById = async (id) => {
    if (!id) {
        throw 'ID could not be identified';
    }

    const match = await Match.findById(id);

    if (!match) {
        return Promise.reject('Match could not be found!');
    } else {
        return match;
    }
}

const checkIfMatchAlreadyExists = (userId, matchedId) => {
    // A helper function that returns true if the match.profiles contains the swiper's ID and the swipee's ID, else returns false
    const match = Match.find( {  } ).exec();
    return match.profiles.includes(userId, matchedId);
}

const MatchService = {
    createMatch,
    checkIfMatchAlreadyExists
};

module.exports = MatchService;