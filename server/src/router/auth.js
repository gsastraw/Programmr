const express = require('express');
const router = express.Router();

// TODO
router.get('/google');

// TODO
router.get('/google/callback');

module.exports = {
    base: "/auth",
    handler: router
};