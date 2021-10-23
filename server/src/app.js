const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const passport = require('passport');

const router = require('./router');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/programmr';
const port = process.env.PORT || 3000;

const root = path.normalize(__dirname + '/../..');
const client = path.join(root, 'client', 'dist');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.options('*', cors());
app.use(cors());

app.use(express.static(client));

const env = app.get('env');

app.use((err, req, res, next) => {
    console.error(err.stack);

    const err_res = {
        'message': err.message,
        'error': {}
    };

    if (env === 'development') {
        err_res['error'] = err.stack;
    }

    res.status(err.status || 500);
    res.json(err_res);
});

/**
 * Used to check if the server is online before running tests
 */
app.head('/api', (req, res) => {
    res.sendStatus(200)
})

app.use(router.User.base, router.User.handler);
app.use(router.Match.base, router.Match.handler);

app.use(history());

app.listen(port, (err) => {
    if (err) {
        throw err;
    }

    console.log(`Express server listening on port ${port}, in ${env} mode`);
});

module.exports = app;
