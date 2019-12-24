const mongoose = require('mongoose');

const projectShema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Project must have a name'],
	},
});

module.exports = mongoose.model('Project', projectShema);
