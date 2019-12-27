const handleCrud = require('./handleCRUD');
const Project = require('./../models/project');

exports.allProjects = handleCrud.getAll(Project);
exports.createProject = handleCrud.createOne(Project);
exports.removeProject = handleCrud.deleteOne(Project);
