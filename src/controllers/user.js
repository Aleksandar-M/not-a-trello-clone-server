const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleCrud = require('./handleCRUD');
const User = require('./../models/user');

exports.signup = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password || password.length < 6) {
		return next('Missing username or password or not vaild');
	}

	try {
		const hashedPass = await bcrypt.hash(password, 10);

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

exports.login = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ email: username }).select('+password');
		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(password, user.password);

		if (!user || !passwordCorrect) {
			return next('Invalid username or password');
		}

		const token = jwt.sign({
			username,
			id: user._id,
		}, process.env.JWT_SECRET,
		{ expiresIn: String(process.env.JWT_EXPIRES) });

		res.status(200).json({
			status: 'Success',
			data: {
				username,
				token,
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
