const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const {
    body,
    validationResult
} = require('express-validator');
const hostname = '127.0.0.1';
const port = 3000;

const GoodModel = require('./models/good.js');
require('./init_db.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

//create a new good
app.post('/good/create', [
    //validate request params
    body('name').isLength({min: 1}).withMessage('param: name required'),
    body('description').isLength({min: 1}).withMessage('param: description required'),
    body('price').isFloat({gt: 0}).withMessage('param: price must be more than 0'),
    body('rating').isInt({min: 1, max: 5}).withMessage('param: rating must be between 1 and 5'),
    body('date_last_purchased').isISO8601().withMessage('param: date_last_purchased is not ISO8601 format'),
    body('days_since_purchased').isInt({min:0}).withMessage('param: days_since_purchased required')
], (req, res) => {
    //if there are validation errors then return the errors in response else create new good
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var array = [];
        errors.array().forEach(element => {
            array.push(element.msg);
        });
        return res.status(400).json({
            errors: array
        });
    }
    else{
        var g = GoodModel.Good({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            date_last_purchased: req.body.date_last_purchased,
            days_since_purchased: req.body.days_since_purchased
        });

        var err = GoodModel.createGood(g);
        if(err)
            res.status(400).json(err);
        res.status(200).json({status: 'success', msg: 'good created successfully'});
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});