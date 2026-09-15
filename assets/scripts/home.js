export function initHome() {
  const homeButton = document.querySelector(".nav__link[data-target='home']");
  homeButton.classList.add("active");
  console.log('Home page initialized');
}