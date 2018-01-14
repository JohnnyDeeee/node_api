var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
// Utils
var logging = require('../util/logging');
// Auth
var hashing = require('../auth/hashing');
// Models
var User = require('../models/user');
var Group = require('../models/group');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Get users from DB and pass them to page
  User.find().populate('group').exec((err, users) => { // Get all users
    if(err) return logging.error(err);

    Group.find({}, (err, groups) => { // Get all groups
      if(err) return logging.error(err);

      return res.render('users', { title: 'Users', users: users, groups: groups })
    });    
  });
});

/* POST users */
router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const groupNames = req.body.groups;

  // TODO: Param validation
  // Get info from form and add info to db
  var groups = [];
  groupNames.forEach(groupName => {
    Group.findOne({name: groupName}, (err, group) => { // Get groups by their name
      if(err) logging.error(err); // Error
      if(!group) logging.error("Could not find group '"+groupName+"'"); // Error
      groups.push(group); // Add group to array
    })
  });

  hashing.hashPassword(password).then(hash => { // Create password hash
    new User({ // Create new user
      username: username,
      password: hash,
      group: groups
    }).save(err => {
      if(err) return logging.error(err); // Error

      // Rerender users
      return res.redirect('/users');
    });
  });
});


module.exports = router;
