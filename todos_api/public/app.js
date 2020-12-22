$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)

    $('#todoInput').keypress(function(event) {
        if(event.which == 13) {
            createTodo();
        }
    })

    $('.list').on('click', 'span', function() {
        deleteTodo($(this).parent())
    })

    $('.list').on('click', 'li', function() {
        updataTodo($(this));
    })
})

function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo) {
        addTodo(todo);
    })
}

function addTodo(todo) {
    var newTodo = $('<li class="task">'+todo.name+' <span>X</span></li>');
    // newTodo.addClass('task');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo() {
    //send request to create new todo
    var userInput = $('#todoInput').val();
    // console.log(userInput)
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo) {
        console.log(newTodo)
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    })
}

function deleteTodo(todo) {
    //send request to delete todo
    var url = '/api/todos/' + todo.data('id');
        $.ajax({
            method: 'DELETE',
            url
        })
        .then(function(data) {
            console.log(data)
            todo.remove();
        })
}

function updataTodo(todo) {
    var url = '/api/todos/' +todo.data('id');
    var isDone = todo.data('completed');
    $.ajax({
        method: 'PUT',
        url,
        data: {completed: !isDone}
    })
    .then(function(updatedTodo) {
        todo.toggleClass('done');
        todo.data('completed', !isDone);
        // console.log(updatedTodo)
    })   
}
