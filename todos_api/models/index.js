var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api')
// mongodb://localhost:27017

mongoose.Promise = Promise;

module.exports.Todo = require('./todo')