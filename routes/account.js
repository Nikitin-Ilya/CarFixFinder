const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Order = require('../models/order');
const passport = require('passport');
const config = require('../config/db');
const jwt = require("jsonwebtoken");
const multer  = require('multer');

/*router.get('/reg', (req, res) => {
    res.send('Сторінка реєстрації');
});*/

router.post('/reg', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
        foto: " "
    });
    /*checkUser = false
    User.getUserByLogin(newUser.login , (err, user) => {
        if(err) throw err;
        if (user) checkUser = true});
    if (checkUser) {res.json({success: false, msg: "Користувач з таким логіном вже існує"}); return };*/
    User.addUser(newUser, (err, user) => {
        if(err) res.json({success: false, msg: "Користувач не був доданий" + err});
        else res.json({success: true, msg: "Користувач був доданий!"});
    });
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
    Time = new Date()
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('.');
      }
    let newOrder = new Order({
        name: req.body.name,
        description: req.body.description,
        descriptionHtml: req.body.descriptionHtml,
        date: formatDate(Data),/*Data.getDate() + "." + Data.getMonth() + "." + Data.getFullYear(),*/
        time: Data.getHours() + ":" + Data.getMinutes(),
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
        User.findOneAndUpdate({login: filedata.originalname }, 
            {foto: filedata.originalname + fileObj[filedata.mimetype] }, null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("БД оновлено: ", docs);
            }
        });
    }
    res.json({success: true, msg: "Зображення завантажено на сервер", image: filedata.originalname + fileObj[filedata.mimetype]});
}
});

module.exports = router;