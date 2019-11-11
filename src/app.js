const express = require('express');
const app = express();
const cors = require('cors');

var databse = require('./db');

app.use(cors());

var medicosController = require('../src/controllers/medicosController');
app.use('/gcb/api/v1', medicosController);

var estadosController = require('../src/controllers/estadosController');
app.use('/estados', estadosController);

module.exports = app;