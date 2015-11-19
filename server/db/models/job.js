var db = require('../database');
var mongoose = require('mongoose');
// var Client = require('./client');

var jobSchema = mongoose.Schema({
 // client: String,
 user: {type: String, ref: 'User'},
 client: {type: Number, ref: 'Client'},
 rate: Number,
 start: Date,
 end: Date,
 status: Boolean,
 description: String
});

var Job = mongoose.model('Job', jobSchema);


module.exports = Job;
