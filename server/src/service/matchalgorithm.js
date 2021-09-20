const MatchService = require('../service/match');
const UserService = require('../service/user');
const User = require('../model/user');

const fetchUsersBasedOffLocation = async (id) => {
    // try {
    //     const user = await User.findById(id, 'location.long location.lat').exec();
    //     const location = getLocation();
    // } catch (err) {

    // }
}

const getLocation = () => {
    if (!navigator.geolocation) {
        throw "Geolocation API not supported by this browser";
    } else {
        return navigator.geolocation.getCurrentPosition(success, failure);
    }    
}

const success = (position, id) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    User.updateOne({ id: id}, { '$set': {
        'location.$.latitude': latitude,
        'location.$.longitude': longitude
    }})
}

const failure = () => {
    throw "Location could not be found!";
}

const MatchAlgorithm = {
    fetchUsersBasedOffLocation,
    getLocation
}
  
module.exports = MatchAlgorithm;