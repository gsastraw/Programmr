const express = require('express');
const router = express.Router();

const MatchService = require('../service').MatchService;
const MatchCommands = require('../command').MatchCommands;

const HttpError = require('../httpError');

router.post('/', (req, res) => {
    const {error, _} = MatchCommands.createMatch.validate(req.body);    
    
    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        })
    }

    const users = req.body.users;

    MatchService.createMatch(users[0], users[1])
        .then(_ => {
            return res.sendStatus(201);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
});

router.get('/', (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : MatchService.DEFAULT_PAGE;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : MatchService.DEFAULT_PAGE_SIZE;

    MatchService.listMatches(page, pageSize)
        .then(matches => {
            return res.json(matches);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
});

router.delete('/', (req, res) => {
    MatchService.deleteMatches()
        .then(_ => {
            return res.sendStatus(200);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
})

router.get('/:matchId', (req, res) => {
    MatchService.getMatch(req.params.matchId)
        .then(match => {
            return res.json(match);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
});

router.delete('/:matchId', (req, res) => {
    MatchService.deleteMatch(req.params.matchId)
        .then(_ => {
            return res.sendStatus(200);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
});

router.put('/:matchId', (req, res) => {
    const {error, _} = MatchCommands.replaceMatch.validate(req.body);    
    
    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        })
    }

    const {users} = req.body;

    MatchService.replaceMatch(req.params.matchId, users)
        .then(_ => {
            return res.sendStatus(200);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
})

router.get('/:matchId/conversation', (req, res) => {
    MatchService.getMatchMessages(req.params.matchId)
        .then(messages => {
            return res.json(messages);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
});

router.post('/:matchId/conversation', (req, res) => {
    const {error, _} = MatchCommands.createMatchMessage.validate(req.body);    
    
    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        })
    }

    const {sender, content} = req.body;

    MatchService.createMatchMessage(req.params.matchId, sender, content)
        .then(_ => {
            return res.sendStatus(200);
        })
        .catch(error => {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).send({
                    message: error.message
                });
            }

            return res.status(500).send({
                message: error
            });
        })
})

const formatValidationError = (error) => {
    if (!error || !error.details) {
        return "An error has occurred";
    }

    const details = error.details;

    if (details.length === 0) {
        return "An error has occurred";
    }

    return details.map(detail => detail.message).join();
}

module.exports = {
    base: "/api/matches",
    handler: router
};