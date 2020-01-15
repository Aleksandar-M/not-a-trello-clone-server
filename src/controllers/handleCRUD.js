
exports.getAll = (Model) => async (req, res) => {
	try {
		const result = await Model.find({});

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

exports.getOne = (Model, populateOptions) => async (req, res) => {
	try {
		let query = Model.findById(req.params.id);
		if (populateOptions) query = query.populate(populateOptions);

		const result = await query;

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
		console.log(err);
	}
};

exports.updateOne = (Model) => async (req, res) => {
	try {
		const result = await Model.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteOne = (Model) => async (req, res) => {
	try {
		const result = await Model.findByIdAndDelete(req.params.id);

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
