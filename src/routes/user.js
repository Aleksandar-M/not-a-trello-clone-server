const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router
	.route('/')
	.get(userController.allUsers);

router
	.route('/:id')
	.get(userController.oneUser)
	.patch(userController.updateUser)
	.delete(userController.removeUser);


module.exports = router;
