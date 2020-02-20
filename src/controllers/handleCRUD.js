const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

exports.getAll = (Model) => async (req, res, next) => {
	try {
		const result = await Model.find({});
		res.status(200).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		return next(err);
	}
};

exports.getOne = (Model, populateOptions) => async (req, res, next) => {
	try {
		const convertedId = mongoose.Types.ObjectId(req.params.id);
		let query = Model.findById(convertedId);
		// let query = Model.findById(req.params.id);

		if (populateOptions) query = query.populate(populateOptions);

		const result = await query;

		if (!result) {
			return next(new AppError('Nothing found with that ID', 404));
		}

		res.status(200).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		return next(err);
	}
};

exports.createOne = (Model) => async (req, res, next) => {
	// TODO: append user and tab id's

	try {
		const result = await Model.create(req.body);

		// On creation of new project append project to request and go to
		// next middleware(addUserToProject)
		if (Model.collection.collectionName === 'projects') {
			req.project = {
				id: result._id,
				name: result.name,
			};
			return next();
		}

		// else ignore it and send response
		res.status(201).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		return next(err);
	}
};

exports.updateOne = (Model) => async (req, res, next) => {
	try {
		const result = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!result) {
			return next(new AppError('Nothing found with that ID', 404));
		}

		res.status(201).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		return next(err);
	}
};

exports.deleteOne = (Model) => async (req, res, next) => {
	try {
		const result = await Model.findByIdAndDelete(req.params.id);

		if (!result) {
			return next(new AppError('Nothing found with that ID', 404));
		}

		res.status(204).json({
			status: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		return next(err);
	}
};
