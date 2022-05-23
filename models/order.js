const mongoose = require('mongoose');
const config = require('../config/db');

const OrderSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    descriptionHtml: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    userLogin:{
        type: String,
        required: true
    }
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.addOrder = function(newOrder, callback){
    newOrder.save(callback);
};

