const mongoose = require("mongoose");
const News = require("../mongooseSheme/newsSheme");

exports.getNews = (req, res, next) => {


    News.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next(error);
        });
}

exports.getNewsById = (req, res, next) => { 
    var id = req.params["id"];

    News.findById()
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
            else{
                res.status(404).send("NotFound");
            }
            
        })
        .catch(error => {
            next(error);
        });
}

exports.addNews = (req, res, next) => {
    var news = new News({
        _id: mongoose.Types.ObjectId(),
        author: req.body.author,
        title: req.body.title,
        url: req.body.url,
        date: req.body.date,
    })

    news.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            next(error);
        });
}

exports.updateNews = (req, res, next) => {
    res.send("Update news endpoint");
}

exports.deleteNews = (req, res, next) => {
    res.send("Delete news endpoint");
}
