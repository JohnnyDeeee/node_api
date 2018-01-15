var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Group = require('../models/group');
var logging = require('../util/logging');

// Returns all groups
exports.listAllGroups = (req, res) => {
    Group.find({}, (err, groups) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            res.json(groups);
        }
    })
}

// Creates a new group
exports.createGroup = (req, res) => {
    // TODO: Param validation

    var newGroup = new Group({
        name: req.body.name
    });
    newGroup.save((err, group) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(group);
        }
    });
}