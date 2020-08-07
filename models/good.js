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
    days_since_purchased: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
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

    //find good by id
    findGoodById : async (id) => {
        return Good.findById(id, (err, g) => {
            if(err)
                return 'error';
            return g;
        });
    },

    //return a paginate list of goods
    findGoods : async (page_number, page_length) => {
        return Good.paginate({}, {
            page: page_number,
            limit: page_length
        }).then( result => {
            return result.docs;
        });
    },

    //update good by id
    updateGood : async (id, g) => {
        return Good.findByIdAndUpdate(id, g, {new: true}, (err, result) => {
            if(err)
                return err;
        });
    },

    //delete good
    deleteGood : async (id) => {
        return Good.findByIdAndDelete(id, (err, res) => {
            if(err)
                return err;
        });
    }

};

