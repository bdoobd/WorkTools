const navElement = document.querySelector(".nav");
const hamburgerElement = document.querySelector(".hamburger");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("nav--open");
  hamburgerElement.classList.toggle("hamburger--open");
});

navElement.addEventListener("click", (event) => {
  const button = event.target.closest(".nav__link");
  if (!button) return;
  navElement.classList.remove("nav--open");
  hamburgerElement.classList.remove("hamburger--open");
});
