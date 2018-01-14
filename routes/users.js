var express = require('express');
var logging = require('../util/logging');
var bcrypt = require('bcrypt');
var router = express.Router();
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.app.get('db');

  // Get users from DB and pass them to page
  db.collection('users').find().toArray((err, results) => {
    return res.render('users', { title: 'Users', users: results })
  });
});

/* POST users */
router.post('/', function(req, res, next) {
  var db = req.app.get('db');
  const username = req.body.username;
  const password = req.body.password;

  // TODO: Param validation
  // Get info from form and add info to db
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.collection('users').insert({ username: username, password: hash });
    
    // Rerender users
    return res.redirect('/users');
  })
});


module.exports = router;
