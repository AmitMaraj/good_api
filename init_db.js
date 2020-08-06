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
        // const g = new GoodModel.Good({
        //     name: 'coke',
        //     description: '20oz coke',
        //     price: 5.00,
        //     rating: 5,
        //     date_last_purchased: new Date().toISOString(),
        //     days_since_purchased: 0
        // });

        // GoodModel.createGood(g);

        db.close();

    });

    
    //create collections
    // db.createCollection('goods', (error, res) => {
    //     if (err) throw err;

    //     console.log('good collection created');

    // });

    db.close();
});