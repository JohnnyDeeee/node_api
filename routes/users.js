var express = require('express');
var router = express.Router();
// Controllers
var userController = require('../controllers/user');

/* GET users listing. */
router.get('/', userController.loginRequired, userController.listAll);

/* POST users */
router.post('/', userController.loginRequired, userController.create);

/* PUT update an user */
router.put('/:userID', userController.loginRequired, userController.update);

/* DELETE an user */
router.delete('/:userID', userController.loginRequired, userController.delete);

module.exports = router;
