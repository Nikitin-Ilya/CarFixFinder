const mongoose = require('mongoose');
const config = require('../config/db');

const ReviewSchema = mongoose.Schema({
    userProfileLogin: {
        type: String,
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
    userCommentLogin:{
        type: String,
        required: true
    }
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);

module.exports.addReview = function(newBid, callback){
    newBid.save(callback);
};

