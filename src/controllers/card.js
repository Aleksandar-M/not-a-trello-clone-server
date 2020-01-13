const handleCrud = require('./handleCRUD');
const Card = require('./../models/card');

exports.setUserAndTab = (req, res, next) => {
	console.log('setUserAndtab params:', req.params);

	if (!req.body.tab) req.body.tab = req.params.tabId;
	if (!req.body.author) req.body.author = req.user.id;
	next();
};

exports.allCards = handleCrud.getAll(Card);
exports.oneCard = handleCrud.getOne(Card, ['tab', 'author']);
exports.createCard = handleCrud.createOne(Card);
exports.updateCard = handleCrud.updateOne(Card);
exports.removeCard = handleCrud.deleteOne(Card);
