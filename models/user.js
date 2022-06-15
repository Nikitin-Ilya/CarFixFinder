const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = function(login, callback){
    const query = { login: login };
    User.findOne(query, callback);
};

/*module.exports.checkUserLogin = function(login){
    const query = { login: login };
    
    if (User.findOne(query, callback)) return true;
    else return false;
};*/

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePass = function(passFromUser, userDBPass, callback){
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.setUserImage = function(data, callback){
    User.findByIdAndUpdate(data.id, { name: "path-to-image" },
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
            }
        }
    );
};

