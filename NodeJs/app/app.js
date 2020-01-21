var express = require('express');
var app = express();
var apiNewsRouter = require('./routes/apiNewsRoutes');
var userRouter = require('./routes/userRoutes');
var mongoose = require('mongoose');
var config = require('./config');
var cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passportConfig = require('./infrastructure/passport');

app.use(cors());

mongoose.connect(config.mongoConnectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/news", apiNewsRouter);
app.use("/user", userRouter);

app.use(function(err, req, res, next) {
    res.send({
        message: err.message,
        status: err.status
    });
})

app.listen(config.port, function () {
    console.log('Example app listening on port 8088!')
})