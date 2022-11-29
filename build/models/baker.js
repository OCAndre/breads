"use strict";
// dependencies
// const mongoose = require('mongoose')
// const Bread = require('./bread')
// const { Schema } = mongoose
// schema
var bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String,
}, { toJSON: { virtuals: true } });
// Virtuals:
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
});
// hooks 
bakerSchema.post('findOneAndDelete', function () {
    Bread.deleteMany({ baker: baker._conditions._id })
        .then(function (deleteStatus) {
        console.log(deleteStatus);
    });
});
// model and export
var Baker = mongoose.model('Baker', bakerSchema);
module.exports = Baker;
