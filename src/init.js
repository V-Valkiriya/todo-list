
let addMessage =document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = [];    

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function() {
    if(!addMessage.value) return;
    let newTodo = {
        todo:addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessages() {
    let displayMessage = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
    displayMessage += `
    <li>
    <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
    <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
    <i class="delete" onclick="deleteTask(${i})"><i class="fa-solid fa-trash-can"></i></i>
    </li>
    `; 
    todo.innerHTML = displayMessage;
    });
} 

todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id');
    let valueLabel = todo.querySelector('[for='+ idInput +']').innerHTML;
    
    todoList.forEach(function(item) {
        if(item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    todoList.forEach(function(item) {
        if (item.todo === event.target.innerHTML) {
            item.important = !item.important;
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

function deleteTask(deleteId) {
    todoList.splice(deleteId, 1);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
}
