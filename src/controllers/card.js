const Tab = require('./../models/tab');
const User = require('./../models/user');
const Card = require('./../models/card');


exports.allCards = async (req, res) => {
	try {
		const result = await Card.find({}).populate('tab', 'author');

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

exports.oneCard = async (req, res) => {
	try {
		const result = await Card.findById(req.params.id);

		if (!result) {
			console.log('Card not found in DB');
		}

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

exports.createCard = async (req, res) => {
	// TODO: append user and tab id's
	try {
		const result = await Card.create(req.body);

		res.status(201).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		console.log(err);
	}
};

exports.updateCard = async (req, res) => {
	try {
		const result = await Card.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!result) {
			console.log('Card not found in DB');
		}

		res.status(201).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		console.log(err);
	}
};

exports.removeCard = async (req, res) => {
	try {
		const result = await Card.findByIdAndDelete(req.params.id);

		if (!result) {
			console.log('Card not found in DB');
		}

		res.status(204).json({
			status: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		console.log(err);
	}
};
