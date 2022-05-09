const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Order = require('../models/order');
const passport = require('passport');
const config = require('../config/db');
const jwt = require("jsonwebtoken");

/*router.get('/reg', (req, res) => {
    res.send('Сторінка реєстрації');
});*/

router.post('/reg', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) res.json({success: false, msg: "Користувач не був доданий"});
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

module.exports = router;