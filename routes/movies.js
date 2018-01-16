var express = require('express');
var router = express.Router();
// Controllers
var movieController = require('../controllers/movie');
var userController = require('../controllers/user');

/* GET movie listing */
router.get('/', userController.loginRequired, movieController.listAll);
router.get('/:actorID', userController.loginRequired, movieController.findByActor);

/* POST movies */
router.post('/', userController.loginRequired, movieController.create);

/* PUT update movie */
router.put('/:movieID', userController.loginRequired, movieController.update);

/* DELETE movie */
router.delete('/:movieID', userController.loginRequired, movieController.delete);

module.exports = router;
