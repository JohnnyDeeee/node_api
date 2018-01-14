var express = require('express');
var logging = require('../util/logging');
var bcrypt = require('bcrypt');
var router = express.Router();
var User = require('../models/user');

/* GET login */
router.get('/', function(req, res, next) {
    return res.render('login', { title: 'Login' })
});

/* POST login */
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // TODO: Param validation
  // Check if users exists in DB
  User.findOne({ username: username }, (err, result) => {
    if(err)
        return logging.error(err);
    
    // Redirect to users if user exists, else redirect current page with error
    if(!result)
        return res.redirect('/login');

    // TODO: Validate password
    var dbPass = result.password;
    bcrypt.compare(password, dbPass, (err, match) => {
        if(err)
            return logging.error(err);

        if(match) // Passwords match
            return res.redirect('/users');
        else
            return res.redirect('/login'); // TODO: Give error to page (use query string)
    });
  });
});


module.exports = router;
