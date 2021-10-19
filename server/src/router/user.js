const express = require('express');
const router = express.Router();

const UserService = require('../service').UserService;
const UserCommands = require('../command').UserCommands;

const MatchService = require('../service').MatchService;

const HttpError = require('../httpError');

router.post('', (req, res) => {
    const {error, _} = UserCommands.createUser.validate(req.body);    

    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        });
    }

    UserService.createUser(req.body.id)
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
        });
});

router.get('', (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : UserService.DEFAULT_PAGE;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : UserService.DEFAULT_PAGE_SIZE;

    UserService.listUsers(page, pageSize)
        .then(users => {
            return res.json(users);
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
        });
});

router.delete('', (req, res) => {
    UserService.deleteUsers()
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
        });
})

router.get('/:userId', (req, res) => {
    UserService.getUser(req.params.userId)
        .then(user => {
            return res.json(user);
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
        });
});

router.delete('/:userId', (req, res) => {
    UserService.deleteUser(req.params.userId)
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
        });
});

router.patch('/:userId', (req, res) => {
    const {error, _} = UserCommands.updateUser.validate(req.body);    

    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        });
    }

    const { id } = req.body;

    UserService.updateUser(req.params.userId, id)
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

router.post('/:userId/profile', (req, res) => {
    const {error, _} = UserCommands.createUserProfile.validate(req.body);    

    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        });
    }

    UserService.createUserProfile(req.params.userId, req.body)
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
        });
})

router.get('/:userId/profile', (req, res) => {
    UserService.getUserProfile(req.params.userId)
        .then(userProfile => {
            return res.json(userProfile);
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
        });
});

router.patch('/:userId/profile', (req, res) => {
    const {error, _} = UserCommands.updateUserProfile.validate(req.body);    

    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        });
    }

    UserService.updateUserProfile(req.params.userId, req.body)
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
        });
});

router.post('/:userId/matches', (req, res) => {
    const {error, _} = UserCommands.createUserMatch.validate(req.body);    

    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        });
    }

    MatchService.createMatch(req.params.userId, req.body.id)
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

router.get('/:userId/matches', (req, res) => {
    MatchService.getMatchesForUser(req.params.userId)
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

router.get('/:userId/matches/:matchId', (req, res) => {
    MatchService.getMatchForUser(req.params.userId, req.params.matchId)
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

router.delete('/:userId/matches/:matchId', (req, res) => {
    MatchService.deleteMatchForUser(req.params.userId, req.params.matchId)
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

router.post('/:userId/match', (req, res) => {
    const {error, _} = UserCommands.matchDecisionCommand.validate(req.body);    

    if (error) {
        return res.status(400).send({
            message: formatValidationError(error)
        });
    }

    UserService.addMatchDecision(req.params.userId, req.body)
        .then(body => {
            return res.json(body);
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

router.get('/:userId/suggest', (req, res) => {
    UserService.getSuggestionsForUser(req.params.userId)
        .then(suggestions => {
            return res.json(suggestions);
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
    base: '/users',
    handler: router
};