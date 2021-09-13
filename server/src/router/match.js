const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

});

router.get('/', (req, res) => {
    
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