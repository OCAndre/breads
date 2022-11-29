"use strict";
// dependencies
// const express = require('express')
var baker = express.Router();
// const Baker = require('../models/baker.js')
var bakerSeedData = require('../models/baker_seed.js');
// export
module.exports = baker;
baker.get('/data/seed', function (req, res) {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'));
});
// Index: 
baker.get('/', function (req, res) {
    Baker.find()
        .populate('breads')
        .then(function (foundBakers) {
        res.send(foundBakers);
    });
});
// Show: 
// show 
baker.get('/:id', function (req, res) {
    Baker.findById(req.params.id)
        .populate({
        path: 'breads',
        options: { limit: 5 }
    })
        .then(function (foundBaker) {
        res.render('bakerShow', {
            baker: foundBaker
        });
    });
});
// delete
baker.delete('/:id', function (req, res) {
    Baker.findByIdAndDelete(req.params.id)
        .then(function (deletedBaker) {
        res.status(303).redirect('/breads');
    });
});
