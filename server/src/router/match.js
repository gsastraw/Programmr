const express = require('express');
const router = express.Router();
const Match = require('../model/match');

router.post('/', (req, res) => { // TODO: not sure if this works
    var match = new Match(req.body);
    match.save(function(err,match){
        if (err) {return next(err);}
        res.status(201).json(match);
    });
});

router.get('/', (req, res) => { // Get a list of all matches with pagination
    Match.find((err, matches) => {
        if (err) {
            return res.status(404).send({ 'message': 'Matches not found!', 'error': err });
        } 
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const results = {};
        let startIndex = (pageNumber - 1) * limit;
        let endIndex = pageNumber * limit;

        if (endIndex < matches.length) {
            results.next = {
                pageNumber: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.fetchedMatches = matches.slice(startIndex, endIndex);
            res.json(results);
        } catch (err) {
            res.status(404).send({ 'message': 'Matches could not be retrieved!' });
        }
    });
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
            return res.status(404).send({ 'message': 'The match you want to delete could not be found! Something went wrong.', 'error': err });
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