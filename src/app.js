const express = require('express');
const bodyParser = require('body-parser');
const cardRouter = require('./routes/card');
const tabRouter = require('./routes/tab');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tabs', tabRouter);

module.exports = app;
