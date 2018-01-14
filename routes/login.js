var express = require('express');
var logging = require('../util/logging');
var bcrypt = require('bcrypt');
var router = express.Router();

/* GET login */
router.get('/', function(req, res, next) {
    return res.render('login', { title: 'Login' })
});

/* POST login */
router.post('/', function(req, res, next) {
  var db = req.app.get('db');
  var username = req.body.username;
  var password = req.body.password;

  // TODO: Param validation
  // Check if users exists in DB
  db.collection('users').find({username: username}, {limit: 1}).toArray((err, results) => {    
    // Redirect to users if user exists, else redirect current page with error
    if(results.length === 0)
        return res.redirect('/login');

    var result = results[0];

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
