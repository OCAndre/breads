"use strict";
// DEPENDENCIES
var express = require('express');
// DEPENDENCIES
var methodOverride = require('method-override');
var mongoose = require('mongoose');
// CONFIGURATION
require('dotenv').config();
var PORT = process.env.PORT;
var app = express();
// MIDDLEWARE
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.urlencoded({ extended: true }));
// MIDDLEWARE
app.use(methodOverride('_method'));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function () { console.log('connected to mongo: ', process.env.MONGO_URI); });
// ROUTES
app.get('/', function (req, res) {
    res.send('Welcome to an Awesome App about Breads');
});
// Breads
var breadsController = require('./controllers/breads_controller.js');
app.use('/breads', breadsController);
// bakers 
var bakersController = require('./controllers/bakers_controller.js');
app.use('/bakers', bakersController);
// LISTEN
app.listen(PORT, function () {
    console.log('listening on port', PORT);
});
// 404 Page
app.get('*', function (req, res) {
    res.send('404');
});
