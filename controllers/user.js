var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var logging = require('../util/logging');

// Returns all users
exports.listAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            res.json(users);
        }
    })
}

// Creates a new User with a password hash
exports.register = (req, res) => {
    // TODO: Param validation

    var newUser = new User({
        username: req.body.username,
    });
    req.body.groups.split(',').forEach(group => {
        newUser.group.push(group.trim()); // Add group to user (use trim to remove whitespaces)
    });
    newUser.password = newUser.createPasswordHash(req.body.password);
    newUser.save((err, user) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            user.password = undefined; // Dont return password to user
            return res.json(user);
        }
    });
}

// Creates a JWT token
exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return logging.error(err);
        if (!user) return res.status(401).json({ message: "Authentication failed, User not found!" });
        else if (user) {
            if (!user.checkPassword(req.body.password))
                return res.status(401).json({ message: "Authentication failed, wrong password!" });
            else
                return res.json({
                    token: jwt.sign({
                        username: user.username,
                        _id: user._id
                    }, 'SECRET_KEY')
                })
        }
    });
}

// Checks if user object is set (done in middleware)
exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized!" });
    }
}