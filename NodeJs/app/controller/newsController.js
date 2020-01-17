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
    var id = mongoose.Types.ObjectId( req.params["id"]);

    News.findById(id)
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

exports.updateNews = async (req, res, next) => {
    try{
        var newsId = mongoose.Types.ObjectId(req.params.id);
        var news = await News.findById(newsId);
        Object.entries(req.body).forEach(([key, value]) => {
            news[key] = value;
        });
        await news.save();
        res.status(201).json(news);
    }
    catch(err) {
        next(err);
    }    
}

exports.deleteNews = async (req, res, next) => {
    try {
        var newsId = mongoose.Types.ObjectId(req.params.id);
        await News.findByIdAndDelete(newsId);
        res.status(200);
    } catch (error) {
        next(err);
    }
}
