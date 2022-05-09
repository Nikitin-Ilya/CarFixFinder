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

/*module.exports.getUserByLogin = function(login, callback){
    const query = { login: login };
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};*/



module.exports.addOrder = function(newOrder, callback){
    newOrder.save(callback);
};
/*
module.exports.comparePass = function(passFromUser, userDBPass, callback){
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}; */

