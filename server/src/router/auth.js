const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')

router.get('', (req, res) => {
    res.send({ message: "Log in to access your account!" });
});

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
    req.logout();
});

module.exports = {
    base: "/auth",
    handler: router
};