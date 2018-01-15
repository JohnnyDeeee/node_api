var express = require('express');
var router = express.Router();
// Controllers
var userController = require('../controllers/user');

/* POST logs a user in */
router.post('/', userController.login);


module.exports = router;
