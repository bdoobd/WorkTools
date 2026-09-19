const LS_KEY = "ToDoList";

function getTodos() {
  const todos = localStorage.getItem(LS_KEY);
  return todos ? JSON.parse(todos) : [];
}

function saveTodos(todos) {
  localStorage.setItem(LS_KEY, JSON.stringify(todos));
}

function renderTodoInterface(container) {
  container.innerHTML = `
        <div class="todo__tasks" id="todo__tasks">
          <div id="in_progress" class="todo__in-progress"></div>
          <h3>Ready</h3>
          <div id="ready" class="todo__ready"></div>
        </div>
        <div class="todo__form">
            <h3>Добавить новую задачу</h3>
            <div class="todo__input-container">
                <input type="text" id="todo_header" class="todo__input-header" placeholder="Заголовок для задачи" tabindex="1" />
                <textarea id="todo_text" class="todo__textarea-text" placeholder="Текст задачи" tabindex="2"></textarea>
                <input type="checkbox" name="important" class="todo__important" tabindex="3"><label for="important" class="label__important">Высокая важность задачи</label>
            </div>
            <button name="addTodo" id="todo__button" class="btn btn__todo-add" tabindex="4">Добавить</button>
        </div>
    `;

  renderTasks();
}

function renderTasks() {
  const tasksBlock = document.getElementById("in_progress");
  const readyBlock = document.getElementById("ready");
  if (!tasksBlock) return;

  const todos = getTodos();

  if (todos.length === 0) {
    tasksBlock.innerHTML = `
            <div class="no_todo__card">
                <h3>Нет задач</h3>
            </div>
        `;
    return;
  }

  tasksBlock.innerHTML = todos
    .map((todo, index) =>
      todo.completed
        ? ""
        : `
        <div class="todo__card ${todo.completed ? "done" : ""} ${todo.important ? "important" : ""}" data-index="${index}">
            <h3 class="todo__card-header">${todo.header}</h3>
            <p class="todo__card-text">${todo.text}</p>
            <div class="todo__card-actions">
                <button class="btn btn__todo-done" data-index="${index}">
                    ✅
                </button>
                <button class="btn btn__todo-delete" data-index="${index}">
                    ❌
                </button>
            </div>
        </div>
    `,
    )
    .join("");

  readyBlock.innerHTML = todos
    .map((todo, index) =>
      todo.completed
        ? `
        <div class="todo__card ${todo.completed ? "done" : ""} ${todo.important ? "important" : ""}" data-index="${index}">
            <h3 class="todo__card-header">${todo.header}</h3>
            <p class="todo__card-text">${todo.text}</p>
            <div class="todo__card-actions">
                <button class="btn btn__todo-done" data-index="${index}">
                    ↩️
                </button>
                <button class="btn btn__todo-delete" data-index="${index}">
                    ❌
                </button>
            </div>
        </div>
    `
        : "",
    )
    .join("");
}

export function initTodo() {
  const todoContainer = document.getElementById("todo__content");
  if (!todoContainer) return;

  renderTodoInterface(todoContainer);

  console.log(getTodos());

  const todoHeader = document.getElementById("todo_header");
  const todoText = document.getElementById("todo_text");
  const todoImportant = document.querySelector(".todo__important");
  const todoButton = document.getElementById("todo__button");

  function addTodo() {
    const header = todoHeader.value.trim();
    const text = todoText.value.trim();
    const important = todoImportant.checked;

    if (!header || !text) return;

    const todos = getTodos();

    todos.push({
      header: header,
      text: text,
      completed: false,
      important: important,
    });
    saveTodos(todos);

    todoHeader.value = "";
    todoText.value = "";
    todoImportant.checked = false;

    renderTasks();
  }

  todoButton.addEventListener("click", addTodo);

  const todoCardsContainer = document.getElementById("todo__tasks");
  todoCardsContainer.addEventListener("click", (e) => {
    const target = e.target;
    const index = parseInt(target.dataset.index, 10);

    if (isNaN(index)) return;

    const todos = getTodos();

    if (target.classList.contains("btn__todo-done")) {
      todos[index].completed = !todos[index].completed;
      saveTodos(todos);
      renderTasks();
    } else if (target.classList.contains("btn__todo-delete")) {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTasks();
    }
  });
}
