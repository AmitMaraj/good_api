const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoose_db = mongoose.connection;
const mongoosePaginate = require('mongoose-paginate-v2');

const good = new Schema({
    name: String,
    description: String,
    price: Number,
    rating: Number,
    date_last_purchased: Date,
    days_since_purchased: Number
});

good.plugin(mongoosePaginate);

//create a model instance. If the collection does not exist then create it.
const Good = mongoose_db.model('Good', good);

module.exports = {

    Good : Good,

    //create an instance of Good (document) and save to collection
    createGood : (g) => {
        return Good.create(g, (err) => {
            if(err){
                console.log(err);
                return err;
            }
        });
    },

    //find good by name and return document
    findGood : (goodName) => {
        return Good.findOne({
            name: goodName
        }).exec();
    },

    findGoods : async (page_number, page_length) => {
        let r;
        return Good.paginate({}, {
            page: page_number,
            limit: page_length
        }).then( result => {
            console.log('results: '+result.docs);
            r = result.docs;
            return r;
        });
    }

};

