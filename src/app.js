const express = require('express');
const bodyParser = require('body-parser');
const cardRouter = require('./routes/card');

const app = express();

app.use(bodyParser.json());

app.use('/api/cards', cardRouter);

module.exports = app;
