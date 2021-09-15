const express = require('express');
const router = express.Router();
const Match = require('../model/match');

router.post('/', (req, res) => { // not sure if this works
    var match = new Match(req.body);
    match.save(function(err,match){
        if (err) {return next(err);}
        res.status(201).json(match);
    })
});

router.get('/', (req, res) => {
    res.json({"matches": Match});
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