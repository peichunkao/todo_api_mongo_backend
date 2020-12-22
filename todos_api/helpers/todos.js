var db = require('../models')
exports.getTodos = function(req, res) {
    // res.send("Hello from todos routes");
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    });
}

exports.createTodo = function(req, res) {
    console.log(req.body)
    db.Todo.create(req.body)
    .then(newTodo => {
        res.status(201).send(newTodo)
    })
    .catch(err => {
        res.send(err);
    })
    // res.send("This is the post rourte.")
}

exports.getTodo = (req,res) => {
    db.Todo.findById(req.params.todoId)
    .then(foundTodo => {
        res.send(foundTodo)
    })
    .catch(err => {
        res.send(err);
    });
}

exports.updateTodo = (req,res) => {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(foundTodo => {
        res.send(foundTodo)
    })
    .catch(err => {
        res.send(err);
    });
};

exports.deleteTodo = (req,res) => {
    db.Todo.remove({_id: req.params.todoId})
    .then(() => {
        res.send({message: 'Data Deleted.'})
    })
    .catch(err => {
        res.send(err);
    });
};

module.exports = exports;