const express = require('express');
const router = express.Router();
const Match = require('../model/match');

router.post('/', (req, res) => {
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
    res.json(Match[req.params.matchId]);
});

router.delete('/:matchId', (req, res) => {
    var id = req.params.matchId;
    var Match = Match[id];
    delete Match[id];
    res.json(Match);
});

router.post('/:matchId/conversation', (req, res) => {

});

router.get('/:matchId/conversation', (req, res) => {

});

module.exports = {
    base: "/matches",
    handler: router
};