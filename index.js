const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
const session = require('express-session');

const app = express();

const port = process.env.port || 3000;

app.use(session({secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
    console.log("Database connected successfully");
});

mongoose.connection.on('error', (err) => {
    console.log("Database connection error: " + err);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/', (req, res) => {
    res.send('CarFixFinder');
});

app.use('/account', account);

app.listen(port, () => {
    console.log("Server is started in port: " + port);
});

