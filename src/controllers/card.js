const handleCrud = require('./handleCRUD');
const Card = require('./../models/card');
const Tab = require('./../models/tab');

exports.setUserAndTab = (req, res, next) => {
	console.log('setUserAndtab params:', req.params);

	if (!req.body.tab) req.body.tab = req.params.tabId;
	if (!req.body.author) req.body.author = req.user.id;
	next();
};

exports.setCompleted = (req, res, next) => {
	req.body.completed = true;
	next();
};

// Parameter: true or false
exports.getAllCompleted = (parameter) => async (req, res) => {
	try {
		const resultTabs = await Tab.find({ project: req.params.projectId });

		const rez = resultTabs.map((el) => Card.find({
			tab: el._id, completed: parameter,
		}).sort({
			deadlineDate: +1,
		}).populate('tab'));

		const result = await Promise.all(rez);

		res.status(200).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		console.log(err);
	}
};

exports.allCards = handleCrud.getAll(Card);
exports.oneCard = handleCrud.getOne(Card, ['tab', 'author']);
exports.createCard = handleCrud.createOne(Card);
exports.updateCard = handleCrud.updateOne(Card);
exports.removeCard = handleCrud.deleteOne(Card);
