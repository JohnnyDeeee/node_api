var express = require('express');
var logging = require('../util/logging');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.app.get('db');

  // Get users from DB and pass them to page
  db.collection('users').find().toArray((err, results) => {
    res.render('users', { title: 'Users', users: results })
  });
});

/* POST users */
router.post('/', function(req, res, next) {
  var db = req.app.get('db');

  // TODO: Param validation
  // Get info from form and add info to db
  db.collection('users').insert({ name: req.body.name });

  // Rerender users
  res.redirect('/users');
})


module.exports = router;
