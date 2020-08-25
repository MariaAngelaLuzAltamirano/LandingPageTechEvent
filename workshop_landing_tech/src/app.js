const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

//routes

app.use(require('./routes/google.routes'));

module.exports = app;