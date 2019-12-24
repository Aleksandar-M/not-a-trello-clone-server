const mongoose = require('mongoose');

const cardShema = new mongoose.Schema({
	description: {
		type: String,
		trim: true,
		required: [true, 'Card must have a description'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	deadlineDate: {
		type: Date,
		required: [true, 'Card must have a deadline date'],
	},
	completed: {
		type: Boolean,
		default: false,
	},
	tags: {
		type: [
			{
				type: String,
				trim: true,
				maxlength: 8,
			},
		],
	},
	tab: {
		type: mongoose.Schema.ObjectId,
		ref: 'Tab',
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	assignedTo: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
	],
});

module.exports = mongoose.model('Card', cardShema);
