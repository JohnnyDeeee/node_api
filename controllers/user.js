var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var logging = require('../util/logging');
var config = require('../config/config');

// Returns all users
exports.listAll = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            users.forEach((elem) => { elem.password = undefined; }); // Dont return password
            res.json(users);
        }
    })
}

// Creates a new User with a password hash
exports.create = (req, res) => {
    // TODO: Param validation

    var newUser = createNewUser(req.body.username, req.body.password);
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

// Updates user info
exports.update = (req, res) => {
    // TODO: Param validation
    var newUser = createNew(req.body.username, req.body.password);
    User.findByIdAndUpdate(req.params.userID, newUser, {new: true}, (err, user) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            user.password = undefined; // Dont return password to user
            return res.json(user);
        }
    });
}

// Delete an user
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userID, (err, user) => {
        if (err){
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json({ message: "User succesfully deleted!" });
        }
    });
}

// Creates a JWT token
exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return logging.error(err);
        if (!user) return res.status(401).json({ message: "Authentication failed, User not found!" });
        else if (user) {
            if (!user.checkPassword(req.body.password)) // Check if password matches user's hash
                return res.status(401).json({ message: "Authentication failed, wrong password!" });
            else
                return res.json({
                    token: jwt.sign({ // Create te JWT token
                        username: user.username,
                        _id: user._id
                    }, config.SECRET_KEY)
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

/* Private functions */
function createNewUser(username, password) {
    var newUser = new User({
        username: username,
    });
    newUser.password = newUser.createPasswordHash(password); // Create hash of given password

    return newUser;
}