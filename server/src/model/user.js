const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    dob: {
        type: Date,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required:true
        }
    },
    bio: String,
    avatar: String
});

userProfileSchema.virtual('fullName').get(() => {
    return this.name.first + ' ' + this.name.last;
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

userSchema.statics.findOrCreate = (condition, callback) => {
    const self = this;
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => {
            return callback(err, result);
        });
    });
}

module.exports = mongoose.model('User', userSchema);