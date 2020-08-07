var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const mongoose_db = mongoose.connection;

var url = "mongodb://mongo:27017/goodDB";

var GoodModel = require('./models/good.js');

//check if db already exist and if not then create new db
MongoClient.connect(url,  (err, db) => {
    if (err) throw err;
    console.log("Database created!");

    mongoose.connect(url, {
        useNewUrlParser: true
    });

    mongoose_db.on('error', console.error.bind(console, 'connection error:'));
    mongoose_db.once('open', function () {
        console.log('connected to mongodb');

        db.close();

    });

    db.close();
});