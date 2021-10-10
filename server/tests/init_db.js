var mongoose = require('mongoose');

// Variables
var mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('Missing MONGODB_URI for dropping test database.');
    process.exit(1);
}

// Drop database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    
    mongoose.connection.db.dropDatabase(function () {
        console.log(`Dropped database: ${mongoURI}`);
    });

    mongoose.connection.db.collection("users").insertOne({
        googleId: "1",
        createdAt: "2021-09-22T21:10:20.503Z",
        updatedAt: "2021-09-22T21:10:20.503Z",
        __v: 0
    }, () => {
        console.log(`Inserted sample user into database: ${mongoURI}`)
    });

    mongoose.connection.db.collection("users").insertOne({
        googleId: "2",
        createdAt: "2021-09-22T21:24:05.027Z",
        updatedAt: "2021-09-22T21:24:05.027Z",
        __v: 0
    }, () => {
        console.log(`Inserted sample user into database: ${mongoURI}`)
        process.exit(0);
    });
});
