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
    Match.find()
});

router.get('/:matchId', (req, res) => {

});

router.delete('/:matchId', (req, res) => {

});

router.post('/:matchId/conversation', (req, res) => {

});

router.get('/:matchId/conversation', (req, res) => {

});

module.exports = {
    base: "/matches",
    handler: router
};