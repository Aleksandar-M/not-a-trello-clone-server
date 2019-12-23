const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });
const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
