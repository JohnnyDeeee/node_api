var express = require('express');
var router = express.Router();
// Controllers
var groupController = require('../controllers/group');
var userController = require('../controllers/user');

/* GET groups listing */
router.get('/', userController.loginRequired, groupController.listAllGroups);

/* POST groups */
router.post('/', userController.loginRequired, groupController.createGroup);


module.exports = router;
