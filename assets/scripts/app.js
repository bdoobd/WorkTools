import { initHome } from "./home.js";
import { initCalc } from "./calc.js";
import { initTodo } from "./todo.js";
import { initMemorizer } from "./memorizer.js";
import { initOther } from "./other.js";
import { initSpare } from "./spare.js";

const navElement = document.querySelector(".nav");
const hamburgerElement = document.querySelector(".hamburger");
const mainElement = document.querySelector(".main");

const routes = {
  'home': () => '<h1>Home</h1>',
  'calc': () => '<h1>Calculator</h1>',
  'todo': () => '<h1>ToDo</h1>',
  'memorizer': () => '<h1>Memorizer</h1>',
  'other': () => '<h1>Other</h1>',
  'spare': () => '<h1>Spare</h1>',
}

function navigateTo(route) {
  if (routes[route]) {
    mainElement.innerHTML = routes[route]();
  }

  if (inits[route]) {
    inits[route]();
  }
}

const inits = {
  'home': initHome,
  'calc': initCalc,
  'todo': initTodo,
  'memorizer': initMemorizer,
  'other': initOther,
  'spare': initSpare,
}

// MENU
hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("nav--open");
  hamburgerElement.classList.toggle("hamburger--open");
});

navElement.addEventListener("click", (event) => {
  const button = event.target.closest(".nav__link");
  if (!button) return;
  navElement.classList.remove("nav--open");
  // navElement.classList.add("active");
  hamburgerElement.classList.remove("hamburger--open");

  const targetId = button.dataset.target;

  navigateTo(targetId);
});

// START UP
document.addEventListener("DOMContentLoaded", () => {
  navigateTo('home');
});
