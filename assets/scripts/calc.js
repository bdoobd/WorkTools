export function initCalc() {
  const calcButton = document.querySelector(".nav__link[data-target='calc']");
  calcButton.classList.add("active");
  console.log('Calculator page initialized');
}