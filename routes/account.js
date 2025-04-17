const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserProfile = require('../models/user-profile');
const Order = require('../models/order');
const Bid = require('../models/bid');
const Review = require('../models/review');
const passport = require('passport');
const config = require('../config/db');
const jwt = require("jsonwebtoken");
const multer  = require('multer');
const bcrypt = require('bcryptjs');

/*router.get('/reg', (req, res) => {
    res.send('Сторінка реєстрації');
});*/

router.post('/reg', (req, res) => {
    let newUser = new User({
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });
    let newUserProfile = new UserProfile({
        login: req.body.login,
        name: null,
        foto: "../../assets/img/header/profile-image.png",
        title: null,
        resume: null,
        resumeHtml: null,
        category: null,
        telegram: null
    });
    User.addUser(newUser, (err, user) => {
        if(err) res.json({success: false, msg: "Користувач не був доданий, користувач з таким логіном вже існує"});
        else res.json({success: true, msg: "Користувач був доданий!"});
    });
    UserProfile.addUserProfile(newUserProfile, (err,user) => {});
});

router.post('/auth', (req, res) => {
    const login = req.body.login;
    const password = req.body.password; 

    User.getUserByLogin(login , (err, user) => {
        if(err) throw err;
        if (!user) 
            return res.json({success: false, msg: "Користувача з таким логіном не було знайдено"});

        User.comparePass(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if (isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 * 24
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                });
            } else
                return res.json({success: false, msg: "Пароль не вірний"});
        });
    });
});

router.post('/create-order', (req, res) => {
    Data = new Date()
    let newOrder = new Order({
        name: req.body.name,
        description: req.body.description,
        descriptionHtml: req.body.descriptionHtml,
        category: req.body.category,
        date: Data,
        userLogin: req.body.userLogin
        /*userLogin: req.body.userLogin*/
    });

    Order.addOrder(newOrder, (err, user) => {
        if(err) res.json({success: false, msg: "Замовлення не було додано"});
        else res.json({success: true, msg: "Замовлення було додано!"});
    });
});

router.get('/orders', async (req, res) => {
    const orders = await Order.find({}).exec();
    res.json(orders);
    /*console.log(orders);*/
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Кабінет користувача');
});

router.get('/getUsers', async (req, res) => {
    const users = await User.find({}).exec();
    console.log(users);
    res.json(users);
});

var store = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'front-end-app/src/assets/img/uploads')
    },
    filename(req, file, cb) {
      console.log(file);
      var fileObj = {
        "image/png": ".png",
        "image/jpeg": ".jpeg",
        "image/jpg": ".jpg"
      };
      if (fileObj[file.mimetype] == undefined) {
        cb(new Error("Формат файлу не підтримується. Доступні формати: .png .jpeg .jpg"));
      } else {
        cb(null, file.originalname + fileObj[file.mimetype])
      }
    }
})

const upload = multer({ storage: store });

router.post('/setProfileImage', upload.single("filedata"), (req, res) => {
    
    let filedata = req.file;
 
    console.log(filedata.originalname);
    if(!filedata)
        res.json({success: false, msg: "Помилка при завантаженні зображення на сервер"});
    else{
        
    var fileObj = {
        "image/png": ".png",
        "image/jpeg": ".jpeg",
        "image/jpg": ".jpg"
      };
    if (fileObj[filedata.mimetype] == undefined) {
        console.log("Формат файлу не підтримується. Доступні формати: .png .jpeg .jpg"); }
    else {
        UserProfile.findOneAndUpdate({login: filedata.originalname }, 
            {foto: "../../assets/img/uploads/" + filedata.originalname + fileObj[filedata.mimetype] }, null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("БД оновлено: ", docs);
            }
        });
    }
    res.json({success: true, msg: "Зображення завантажено на сервер", image: "../../assets/img/uploads/" + filedata.originalname + fileObj[filedata.mimetype]});
}
});

router.post('/updateUserProfile', (req, res) => {
    let user = new UserProfile({
        login: req.body.userLogin,
        name: req.body.name,
        title: req.body.title,
        resume: req.body.resume,
        resumeHtml: req.body.resumeHtml,
        category: req.body.category,
        telegram: req.body.telegram
    });
    UserProfile.findOneAndUpdate({login: user.login },
        { $set:{name: user.name,
                title: user.title,
                resume: user.resume,
                resumeHtml: user.resumeHtml,
                telegram: user.telegram,
                category: user.category,}}, null, function (err, docs) {
        if (err){
            console.log(err)
            res.json({success: false, msg: "Помилка при збереженні даних"});
        }
        else{
            console.log("БД оновлено: ", docs);
            res.json({success: true, msg: "Дані успішно збережено"});
        }
    });
});

router.get('/getUsersProfile', async (req, res) => {
    const usersProfile = await UserProfile.find({}).exec();
    res.json(usersProfile);
});

router.post('/updateUserEmail', (req, res) => {
    let user =({
        login: req.body.login,
        email: req.body.email
    });
    User.findOneAndUpdate({login: user.login },
        { $set: { email: user.email }}, null, function (err, docs) {
            if (err){
                console.log(err)
                res.json({success: false, msg: "Помилка"});
            }
            else{
                console.log("БД оновлено: ", docs);
                res.json({success: true, msg: "Електронну пошту збережено"});
            }
    });
});

router.post('/updateUserPassword', (req, res) => {
    let user =({
        login: req.body.login,
        newPassword: req.body.newPassword,
        oldPassword: req.body.oldPassword
    });
    User.getUserByLogin(user.login , (err, user1) => {
        if(err) throw err;
        if (!user1) 
            return res.json({success: false, msg: "Користувача з таким логіном не було знайдено"});
        User.comparePass(user.oldPassword, user1.password, (err, isMatch) => {
            if(err) throw err;
            if (isMatch){
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        user.newPassword = hash;
                        console.log(user.newPassword)
                        User.findOneAndUpdate({login: user.login },
                            { $set: { password: user.newPassword }}, null, function (err, docs) {
                                if (err){
                                    console.log(err)
                                    res.json({success: false, msg: "Помилка при збереженні паролю"});
                                }
                                else{
                                    console.log("БД оновлено: ", docs);
                                    res.json({success: true, msg: "Пароль успішно збережено"});
                                }
                        });
                    });
                });
            } else return res.json({success: false, msg: "Старий пароль не вірний"});
        });
    });
});

router.post('/create-bid', (req, res) => {
    Data = new Date()
    /*function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('.');
      }*/
    let newBid = new Bid({
        orderId: req.body.orderId,
        price: req.body.price,
        terms: req.body.terms,
        comment: req.body.comment,
        date: Data,
        userLogin: req.body.userLogin
        /*userLogin: req.body.userLogin*/
    });
    Bid.addBid(newBid, (err, user) => {
        if(err) {
            console.log(err);
            res.json({success: false, msg: "Ставку не створено"});
        }
        else {
            console.log("Ставка створена!");
            res.json({success: true, msg: "Ставка створена!"});
        }
    });
});

router.get('/bids', async (req, res) => {
    const bids = await Bid.find({}).exec();
    res.json(bids);
});

router.post('/getBidsByOrderId', async (req, res) => {
    const bids = await Bid.find({orderId: req.body.orderId}).exec();
    res.json(bids);
});

router.post('/create-comment', (req, res) => {
    Data = new Date()
    let newBid = new Review({
        userProfileLogin: req.body.userProfileLogin,
        comment: req.body.comment,
        date: Data,
        userCommentLogin: req.body.userCommentLogin
        /*userLogin: req.body.userLogin*/
    });
    Review.addReview(newBid, (err, user) => {
        if(err) {
            console.log(err);
            res.json({success: false, msg: "Відгук не створено"});
        }
        else {
            console.log("Ставка створена!");
            res.json({success: true, msg: "Відгук створено"});
        }
    });
});

router.post('/getCommentsByLogin', async (req, res) => {
    const Reviews = await Review.find({userProfileLogin: req.body.userProfileLogin}).exec();
    res.json(Reviews);
});

// TODO: get user profile by login from the DB (db model name: UserProfile)
// TODO: get orders that suit the user from the DB (db model name: Order)

module.exports = router;