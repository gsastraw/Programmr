const UserService = require('../service/user');
const MatchService = require('../service/match');
const User = require('../model/user');

const fetchUsersBasedOffLocation = async (id) => {
    // Fetches all users IDs with location values greater than or equal to the currently logged in user's location 
    const user = UserService.getUser(id);
  
    if (!id) {
        throw 'Id not defined';
    }

    const potentialUsers = await User.find( { googleId: { $ne: id } } )
                               .where('location.long').gte(user.location.long)
                               .where('location.lat').gte(user.location.lat)
                               .select('googleId')
                               .limit(20)
                               .exec();
    if (!potentialUsers) {
        return Promise.reject("Could not find any users!");
    }                           
    const unmatchedUsers = [];

    // TODO: make loop more efficient
    for (let i = 0; potentialUsers.length; i++) {
        for (let j = 0; user.disliked.length; j++) {
            for (let k = 0; user.liked.length; k++) {
                if (user.disliked[j] != potentialUsers[i]) {
                    if (user.liked[k] != potentialUsers[i]) {
                        if (!MatchService.checkIfMatchAlreadyExists(id, potentialUsers[i])) {
                            unmatchedUsers.push(potentialUsers[i]);
                        }
                    }
                }
            }
        }
    }
    return unmatchedUsers;
}

const MatchAlgorithm = {
    fetchUsersBasedOffLocation,
}
  
module.exports = MatchAlgorithm;