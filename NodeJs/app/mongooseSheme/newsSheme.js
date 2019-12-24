var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: String,
    title: String,
    url: String,
    date: String
});

module.exports = mongoose.model("News", newsSchema, "news");