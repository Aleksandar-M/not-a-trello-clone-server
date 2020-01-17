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
	const { email, password } = req.body;

	if (!email || !password) {
		return next('Please provide email and password');
	}

	try {
		const user = await User.findOne({ email }).select('+password');
		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(password, user.password);

		if (!user || !passwordCorrect) {
			return next('Invalid email or password');
		}

		const token = jwt.sign({
			email,
			id: user._id,
		}, process.env.JWT_SECRET,
		{ expiresIn: String(process.env.JWT_EXPIRES) });

		res.status(200).json({
			status: 'Success',
			data: {
				email,
				token,
			},
		});
	} catch (err) {
		next(err);
	}
};

exports.protect = async (req, res, next) => {
	const { authorization } = req.headers;
	let token;
	let	decoded;

	if (authorization && authorization.startsWith('Bearer')) {
		token = authorization.split(' ')[1];
	}

	if (!token) {
		return next('You are not logged in');
	}

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		next(err);
	}

	if (!decoded) {
		return next('You are not logged in');
	}

	// Append user to request
	req.user = {
		email: decoded.email,
		id: decoded.id,
	};

	// Grant access to protected route
	next();
};

exports.addUserToProject = async (req, res, next) => {
	let userID;
	let projectID;

	if (req.project) {
		// Newly created project, add current user who created project
		projectID = req.project.id;
		userID = req.user.id;
	} else {
		// Add others
		projectID = req.params.projectId;
		userID = req.body.userId;
	}

	try {
		const result = await User.findByIdAndUpdate(userID, {
			$push: {
				assignedToProjects: projectID,
			},
		}, {
			new: true,
			runValidators: true,
		});

		if (!result) {
			next('Project not found in DB');
		}

		res.status(201).json({
			message: 'Success',
			data: {
				result,
			},
		});
	} catch (err) {
		next(err);
	}
};

exports.allUsers = handleCrud.getAll(User);
exports.oneUser = handleCrud.getOne(User, ['assignedToProjects', 'assignedToCards']);
exports.updateUser = handleCrud.updateOne(User);
exports.removeUser = handleCrud.deleteOne(User);
