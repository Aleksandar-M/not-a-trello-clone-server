const mongoose = require('mongoose');
const validator = require('validator');

const userShema = new mongoose.Shema({
	email: {
		type: String,
		required: [true, 'User must have a email'],
		unique: true,
		validate: [validator.isEmail, 'User must have valid email'],
	},
	pasword: {
		type: String,
		required: [true, 'User must define password'],
		minlength: 6,
		select: false,
	},
	photo: {
		type: String,
	},
	assignedToProjects: [
		{
			type: mongoose.Shema.ObjectId,
			ref: 'Project',
		},
	],
	assignedToCards: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Card',
		},
	],
});

module.exports = mongoose.model('User', userShema);
