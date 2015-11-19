var db = require('../database');
var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  user: {type: Number, ref: 'User'},
  job: {type: Number, ref: 'Job'},
  name: Number,
  start: Date,
  end: Date,
  status: Boolean
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
