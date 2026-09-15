const LS_KEY = "ToDoList";

function renderTodoInterface(container) {
  container.innerHTML = `
        <div class="todo__form">
            <div class="todo__input-container">
                <input type="text" id="todo_header" class="todo__input-header" placeholder="Заголовок для задачи" />
                <textarea id="todo_text" class="todo__textarea-text" placeholder="Текст задачи"></textarea>
            </div>
            <button name="addTodo" id="todo__button" class="btn btn__todo-add">Добавить</button>
        </div>
    `;
}

export function initTodo() {
  const todoContainer = document.getElementById("todo__content");
  if (!todoContainer) return;

  renderTodoInterface(todoContainer);
  //   const todoButton = document.querySelector(".nav__link[data-target='todo']");
  //   todoButton.classList.add("active");
  //   console.log('Todo page initialized');
}
