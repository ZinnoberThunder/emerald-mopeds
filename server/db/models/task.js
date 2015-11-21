var db = require('../database');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var taskSchema = mongoose.Schema({
  user: {type: Number, ref: 'User'},
  job: {type: Number, ref: 'Job'},
  name: String,
  start: Date,
  end: Date
});

taskSchema.plugin(autoIncrement.plugin, 'Task');

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
