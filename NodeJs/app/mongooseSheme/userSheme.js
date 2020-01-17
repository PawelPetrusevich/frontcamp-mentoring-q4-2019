var mongoose = require('mongoose');

var userShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: String,
    password: String
});

module.exports = mongoose.model("User", userShema, "user");