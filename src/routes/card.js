const express = require('express');
const cardController = require('../controllers/card');
const userController = require('../controllers/user');

const router = express.Router();

// Middleware that allows only registered users to access routes
router.use(userController.protect);

router
	.route('/')
	.get(cardController.allCards)
	.post(cardController.createCard);

router
	.route('/:id')
	.get(cardController.oneCard)
	.patch(cardController.updateCard)
	.delete(cardController.removeCard);


module.exports = router;
