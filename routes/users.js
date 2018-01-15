var express = require('express');
var router = express.Router();
// Controllers
var userController = require('../controllers/user');

/* GET users listing. */
router.get('/', userController.loginRequired, userController.listAllUsers);

/* POST users */
router.post('/', userController.loginRequired, userController.register);


module.exports = router;
