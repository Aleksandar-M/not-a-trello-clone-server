const express = require('express');
const cardController = require('../controllers/card');
const userController = require('../controllers/user');

const router = express.Router({ mergeParams: true });

// Middleware that allows only registered users to access routes
router.use(userController.protect);

router.patch('/:id/complete',
	cardController.setCompleted,
	cardController.updateCard);

router.get('/allCompleted', cardController.getAllCompleted('true'));

router
	.route('/')
	// .get(cardController.allCards)
	.get(cardController.getAllCompleted(false))
	.post(cardController.setUserAndTab, cardController.createCard);

router
	.route('/:id')
	.get(cardController.oneCard)
	.patch(cardController.updateCard)
	.delete(cardController.removeCard);


module.exports = router;
