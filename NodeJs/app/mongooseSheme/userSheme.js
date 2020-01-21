var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: String,
    password: String,
    hash: String,
    salt: String
});

userShema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userShema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

userShema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    var signToken = jwt.sign({
        login: this.login,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret');

    return signToken;
}

userShema.methods.toAuthJson = function () {
    var result = {
        _id: this._id,
        login: this.login,
        token: this.generateJWT()
    };

    return result;    
}


module.exports = mongoose.model("User", userShema, "user");