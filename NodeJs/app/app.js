var express = require('express');
var app = express();
var apiNewsRouter = require('./routes/apiNewsRoutes');

app.use("/news", apiNewsRouter);

app.use(function(err, req, res, next) {
    res.send({
        message: err.message,
        status: err.status
    });
})

app.listen(8088, function () {
    console.log('Example app listening on port 8088!')
})