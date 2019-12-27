const handleCrud = require('./handleCRUD');
const Tab = require('./../models/tab');

exports.allTabs = handleCrud.getAll(Tab);
exports.oneTab = handleCrud.getOne(Tab);
exports.createTab = handleCrud.createOne(Tab);
exports.updateTab = handleCrud.updateOne(Tab);
exports.removeTab = handleCrud.deleteOne(Tab);
