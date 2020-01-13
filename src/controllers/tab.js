const handleCrud = require('./handleCRUD');
const Tab = require('./../models/tab');

exports.setProject = (req, res, next) => {
	console.log(req.params);
	if (!req.body.project) req.body.project = req.params.projectId;
	next();
};

exports.allTabs = handleCrud.getAll(Tab);
exports.oneTab = handleCrud.getOne(Tab, 'project');
exports.createTab = handleCrud.createOne(Tab);
exports.updateTab = handleCrud.updateOne(Tab);
exports.removeTab = handleCrud.deleteOne(Tab);
