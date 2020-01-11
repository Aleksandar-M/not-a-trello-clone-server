const express = require('express');
const projectController = require('../controllers/project');
const userController = require('../controllers/user');

const router = express.Router();

// Middleware that allows only registered users to access routes
router.use(userController.protect);

router
	.route('/')
	.get(projectController.allProjects)
	.post(projectController.createProject);

router
	.route('/:id')
	.delete(projectController.removeProject);

module.exports = router;
