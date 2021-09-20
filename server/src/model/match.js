const mongoose = require('mongoose');

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
    status: {
        type: String,
        enum: ['complete', 'incomplete']
    },
    profiles: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    messages: [messageSchema]
},
{
    timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);