const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Middleware that allows only registered users to access routes
router.use(userController.protect);

router
	.route('/')
	.get(userController.allUsers);

router
	.route('/:id')
	.get(userController.oneUser)
	.patch(userController.updateUser)
	.delete(userController.removeUser);


module.exports = router;
