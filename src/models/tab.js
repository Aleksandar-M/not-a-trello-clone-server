const mongoose = require('mongoose');

const tabShema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Tab must have a name'],
	},
	project: {
		type: mongoose.Schema.ObjectId,
		ref: 'Project',
	},
});

module.exports = mongoose.model('Tab', tabShema);
