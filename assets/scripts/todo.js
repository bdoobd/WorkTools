const LS_KEY = 'ToDoList';

function renderTodoInterface(container) {
    container.innerHTML = `
        <div class="todo__input-container">
            <input type="text" id="todo__input" placeholder="Add a new task..." />
        </div>
    `;
}

export function initTodo() {
    const todoContainer = document.getElementById('todo__content');
    if (!todoContainer) return;
    
    renderTodoInterface(todoContainer);
//   const todoButton = document.querySelector(".nav__link[data-target='todo']");
//   todoButton.classList.add("active");
//   console.log('Todo page initialized');
}