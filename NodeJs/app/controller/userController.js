const mongoose = require("mongoose");
const passport = require('passport');
const User = require("../mongooseSheme/userSheme");

exports.login = async (req, res, next) => {
    try {
        const user = req.body;

        if (!user.login) {
            return res.status(422).json({
                errors: {
                    login: 'is required'
                }
            });
        }

        if(!user.password) {
            return res.status(422).json({
            errors: {
                password: 'is required',
            },
            });
        }

        return  passport.authenticate('local', { session: false }, signIn.bind(res)) (req, res, next);
    } catch(err) {
        return next(err);
    }
}

function signIn(err, passportUser, info) {
    if (err) {
        return next(err);
    }

    if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return this.json({ user: user.toAuthJson() });
    }

    return status(400).info;
}

exports.register = async (req, res, next) => {
    try {
        const user = req.body;

        if (!user.login) {
            return res.status(422).json({
                errors: {
                    login: 'is required'
                }
            });
        }

        if(!user.password) {
            return res.status(422).json({
            errors: {
                password: 'is required',
            },
            });
        }

        var dbUser = new User(user);
        dbUser.setPassword(user.password);
        dbUser._id = mongoose.Types.ObjectId();
        await dbUser.save();

        return res.json({ user: dbUser.toAuthJson() })

    } catch (error) {
        return next(error);
    }
}

exports.getUserInfo = (req, res, next) => {

}