const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleCrud = require('./handleCRUD');
const User = require('./../models/user');

exports.signup = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password || password.length < 6) {
		return next('Missing username or password or not vaild');
	}

	try {
		const hashedPass = await bcryptjs.hash(password, 10);

		const newUser = await User.create({
			email,
			password: hashedPass,
		});

		res.status(201).json({
			message: 'Success',
			data: {
				newUser,
			},
		});
	} catch (err) {
		next(err);
	}
};

exports.allUsers = handleCrud.getAll(User);
exports.oneUser = handleCrud.getOne(User);
exports.updateUser = handleCrud.updateOne(User);
exports.removeUser = handleCrud.deleteOne(User);
