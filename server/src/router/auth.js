const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {

});

router.post('/logout', (req, res) => {

});

router.post('/register', (req, res) => {

});

module.exports = {
    base: "/auth",
    handler: router
};