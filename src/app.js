const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cardRouter = require('./routes/card');
const tabRouter = require('./routes/tab');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/globalErrorHandler');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tabs', tabRouter);

// All other unhandled routes
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
