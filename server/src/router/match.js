const express = require('express');
const router = express.Router();
const Match = require('../model/match');
const MatchService = require('../service/match');

router.post('/', (req, res) => { // TODO: not sure if this works
    
});

router.get('/', async (req, res) => { // Get a list of all matches with pagination
    try {
        const pageSize = parseInt(req.query.limit || 20);
        const page = parseInt(req.query.skip || 1);
        const matches = await Match.find()
                        .limit(pageSize)
                        .skip(page - 1)
                        .exec();
        return res.json(matches);
    } catch(err){ 
        return res.status(500).send(err);
    }
});

router.get('/:matchId', (req, res) => {
    let matchId = req.params.matchId;
    Match.findById(matchId, (err, match) => {
        if (err) {
            return res.status(404).send({ 'message': 'Match not found!', 'error': err });
        }
        if (match === null) {
            return res.status(404).send({ 'message': 'Match not found!', 'error': err });
        }
        res.json(match);
    });
});

router.delete('/:matchId', (req, res) => {
    let matchId = req.params.matchId;
    Match.findOneAndDelete({_id: matchId}, (err, match) => {
        if (err) {
            return res.status(404).send({ 'message': 'The match you want to delete could not be found', 'error': err });
        }
        if (match === null) {
            return res.status(404).send({ 'message': 'The match you want to delete could not be found! Something went wrong.', 'error': err });
        }
        res.json(match);
    });
});

router.post('/:matchId/conversation', (req, res) => {


});

router.get('/:matchId/conversation', (req, res) => {

});

module.exports = {
    base: "/matches",
    handler: router
};