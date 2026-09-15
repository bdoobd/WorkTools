export function initTodo() {
  const todoButton = document.querySelector(".nav__link[data-target='todo']");
  todoButton.classList.add("active");
  console.log('Todo page initialized');
}