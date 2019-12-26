const express = require('express');
const cardController = require('../controllers/card');

const router = express.Router();

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
