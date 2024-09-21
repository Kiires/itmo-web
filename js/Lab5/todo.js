document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    // Загрузка сохранённых задач из LocalStorage
    loadTodos();

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = todoInput.value.trim();
        if (taskText !== "") {
            addTodoItem(taskText);
            saveTodoItem(taskText);
            todoInput.value = '';
        }
    });

    // Добавление новой задачи в список
    function addTodoItem(taskText) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const textNode = document.createTextNode(taskText);

        li.appendChild(checkbox);
        li.appendChild(textNode);
        todoList.appendChild(li);

        // Событие на чекбоксе для удаления задачи
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                removeTodoItem(taskText);
                todoList.removeChild(li);
            }
        });
    }

    // Сохранение задачи в LocalStorage
    function saveTodoItem(taskText) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(taskText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Удаление задачи из LocalStorage
    function removeTodoItem(taskText) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo !== taskText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Загрузка задач из LocalStorage при загрузке страницы
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(task => addTodoItem(task));
    }
});
