var express = require('express');
var app = express();
var apiNewsRouter = require('./routes/apiNewsRoutes');
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongoConnectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());

app.use("/news", apiNewsRouter);

app.use(function(err, req, res, next) {
    res.send({
        message: err.message,
        status: err.status
    });
})

app.listen(config.port, function () {
    console.log('Example app listening on port 8088!')
})