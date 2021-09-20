const UserService = require('../service/user');
const User = require('../model/user');

const fetchUsersBasedOffLocation = async (id) => {
    // Fetches all users IDs with location values greater than or equal to the currently logged in user's location 
    const user = UserService.getUser(id);
    const potentialUsers = await User.find( { googleId: { $ne: id } } )
                               .where('location.long').gte(user.location.long)
                               .where('location.lat').gte(user.location.lat)
                               .select('googleId')
                               .exec();

    if (!id) {
        throw 'Id not defined';
    }
        
    if (!potentialUsers) {
        return Promise.reject("Could not find any users!");
    } 

    return potentialUsers;
}

const MatchAlgorithm = {
    fetchUsersBasedOffLocation,
}
  
module.exports = MatchAlgorithm;