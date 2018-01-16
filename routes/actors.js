var express = require('express');
var router = express.Router();
// Controllers
var actorController = require('../controllers/actor');
var userController = require('../controllers/user');

/* GET actors listing */
router.get('/', userController.loginRequired, actorController.listAll);
router.get('/:actorID', userController.loginRequired, actorController.listOne);

/* POST actors */
router.post('/', userController.loginRequired, actorController.create);

/* PUT update actor */
router.put('/:actorID', userController.loginRequired, actorController.update);

/* DELETE actor */
router.delete('/:actorID', userController.loginRequired, actorController.delete);

module.exports = router;
