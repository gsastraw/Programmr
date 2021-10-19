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
    bio: String,
    avatarUrl: [String]
});

userProfileSchema.virtual('fullName').get(() => {
    return this.firstName + ' ' + this.lastName;
});

const matchInfoSchema = new mongoose.Schema({
    accepted: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    rejected: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    profile: userProfileSchema,
    matchInfo: {
        type: matchInfoSchema,
        required: true,
        default: {
            accepted: [],
            rejected: []
        }
    }
},
{
    timestamps: true
});

userSchema.methods.hasMatchDecision = function(userId) {
    return this.matchInfo.accepted.includes(userId) || this.matchInfo.rejected.includes(userId);
}

userSchema.methods.addMatchDecision = function(userId, status) {
    switch (status) {
        case "accept":
            this.matchInfo.accepted.push(userId);
            break;
        case "reject":
            this.matchInfo.rejected.push(userId);
            break;
    }

    this.save();
}

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);