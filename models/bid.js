const mongoose = require('mongoose');
const config = require('../config/db');

const BidSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    terms: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    userLogin:{
        type: String,
        required: true
    }
});

const Bid = module.exports = mongoose.model('Bid', BidSchema);

module.exports.addBid = function(newBid, callback){
    newBid.save(callback);
};

