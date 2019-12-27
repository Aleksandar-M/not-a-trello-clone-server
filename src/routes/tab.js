const express = require('express');
const tabController = require('../controllers/tab');

const router = express.Router();

router
	.route('/')
	.get(tabController.allTabs)
	.post(tabController.createTab);

router
	.route('/:id')
	.get(tabController.oneTab)
	.delete(tabController.removeTab);

module.exports = router;
