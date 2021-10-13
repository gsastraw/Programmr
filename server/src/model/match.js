const mongoose = require('mongoose');
const HttpError = require('../httpError');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        immutable: true
    }
},
{
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

const matchSchema = new mongoose.Schema({
    profiles: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    messages: {
        type: [messageSchema],
        required: true,
        default: []
    }
},
{
    timestamps: true
});

matchSchema.methods.addMessage = function(sender, content) {
    if (!sender) {
        throw new HttpError('Sender required', 400);
    }

    if (!content) {
        throw new HttpError('Content required', 400);
    }

    if (!this.profiles.includes(sender)) {
        throw new HttpError(`Provided sender with id '${sender}' does not exist in match with id '${this._id}'`, 400)
    }

    this.messages.push({
        sender,
        content
    });
    this.save();
}

module.exports = mongoose.model('Match', matchSchema);