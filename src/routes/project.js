const express = require('express');
const projectController = require('../controllers/project');

const router = express.Router();

router
	.route('/')
	.get(projectController.allProjects)
	.post(projectController.createProject);

router
	.route('/:id')
	.delete(projectController.removeProject);

module.exports = router;
