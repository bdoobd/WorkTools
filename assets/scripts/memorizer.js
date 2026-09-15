export function initMemorizer() {
  const memorizerButton = document.querySelector(".nav__link[data-target='memorizer']");
  memorizerButton.classList.add("active");
  console.log('Memorizer page initialized');
}