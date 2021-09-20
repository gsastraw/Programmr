const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const userProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    location: {
        long: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
    liked: [],
    disliked: [],
    bio: String,
    avatarUrl: String
});

userProfileSchema.virtual('fullName').get(() => {
    return this.firstName + ' ' + this.lastName;
});

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    profile: userProfileSchema,
},
{
    timestamps: true
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);