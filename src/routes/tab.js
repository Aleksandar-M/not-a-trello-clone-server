const express = require('express');
const tabController = require('../controllers/tab');
const userController = require('../controllers/user');

const router = express.Router();

// Middleware that allows only registered users to access routes
router.use(userController.protect);

router
	.route('/')
	.get(tabController.allTabs)
	.post(tabController.createTab);

router
	.route('/:id')
	.get(tabController.oneTab)
	.delete(tabController.removeTab);

module.exports = router;
