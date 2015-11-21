var db = require('../database');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
// var Client = require('./client');

var jobSchema = mongoose.Schema({
 _id: Number,
 user: {type: String, ref: 'User'},
 client: {type: Number, ref: 'Client'},
 rate: Number,
 start: Date,
 end: Date,
 status: Boolean,
 description: String
});

jobSchema.plugin(autoIncrement.plugin, 'Job');

var Job = mongoose.model('Job', jobSchema);


module.exports = Job;
