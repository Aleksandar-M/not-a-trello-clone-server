const express = require('express');
const projectController = require('../controllers/project');
const userController = require('../controllers/user');
const tabRouter = require('./tab');
const cardRouter = require('./card');

const router = express.Router();

// Middleware that allows only registered users to access routes
router.use(userController.protect);

router.use('/:projectId/tabs', tabRouter);

// For adding to Completed tab
router.use('/:projectId/cards', cardRouter);

router.patch('/:projectId/userToProject', userController.addUserToProject);

router
	.route('/')
	.get(projectController.allProjects)
	.post(projectController.createProject, userController.addUserToProject);

router
	.route('/:id')
	.get(projectController.oneProject)
	.delete(projectController.removeProject);

module.exports = router;
