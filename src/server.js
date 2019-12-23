const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `${__dirname}/../.env` });
const app = require('./app');

const url = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}).then(() => { console.log('Successfully connected to database'); });


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
