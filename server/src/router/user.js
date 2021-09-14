const express = require('express');
const router = express.Router();

router.post('', (req, res) => {
    res.status(200)
});

router.get('', (req, res) => {
    res.status(200)
});

router.get('/:userId', (req, res) => {

});

router.patch('/:userId', (req, res) => {

});

router.delete('/:userId', (req, res) => {

});

router.get('/:userId/profile', (req, res) => {
    
});

router.patch('/:userId/profile', (req, res) => {

});

router.post('/:userId/matches', (req, res) => {

});

router.get('/:userId/matches', (req, res) => {

});

module.exports = {
    base: '/users',
    handler: router
};