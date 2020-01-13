const express = require('express');
const tabController = require('../controllers/tab');
const userController = require('../controllers/user');
const cardRouter = require('./card');

const router = express.Router({ mergeParams: true });

// Middleware that allows only registered users to access routes
router.use(userController.protect);

router.use('/:tabId/cards', cardRouter);

router
	.route('/')
	.get(tabController.allTabs)
	.post(tabController.setProject, tabController.createTab);

router
	.route('/:id')
	.get(tabController.oneTab)
	.delete(tabController.removeTab);

module.exports = router;
