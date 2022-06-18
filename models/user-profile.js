const mongoose = require('mongoose');
const config = require('../config/db');

const UserProfileSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    foto: {
        type: String,
    },
    title: {
        type: String,
    },
    resume: {
        type: String,
    },
    resumeHtml: {
        type: String
    },
    category: {
        type: String
    },
    telegram: {
        type: String
    }
});

const UserProfile = module.exports = mongoose.model('UserProfile', UserProfileSchema);

module.exports.addUserProfile = function(newUserProfile, callback){
    newUserProfile.save(callback);
}

module.exports.updateUserProfile = function(newUserProfile, callback){
    newUserProfile.save(callback);
}

/*module.exports.getUserByLogin = function(login, callback){
    const query = { login: login };
    User.findOne(query, callback);
};

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
};*/

