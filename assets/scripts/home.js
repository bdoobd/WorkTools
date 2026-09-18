const TLS = "ToolBoxLinks";

const linkData = async function getLinkData() {
  const linkFile = "assets/json/home.json";

  try {
    const response = await fetch(linkFile);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);

    return { error: "Failed to load link data" };
  }
};

const linkCard = function (data) {
  return `
    <div class="card__link">
      <div class="card__header">
        <h3><a href="${data.url}">${data.title}</a></h3>
      </div>
      <div class="card__body">
        ${data.description} 
      </div>
      <div class="card__footer"><h4>${data.category}</h4></div>
    </div>
  `;
};

export async function initHome() {
  const addButton = document.getElementById("add-link-btn");
  const grid = document.getElementById("links-grid");
  if (!addButton) return;

  addButton.addEventListener("click", () => {
    console.log("Add link button clicked");
  });

  const links = await linkData();

  let data = links.links;
  // TODO: Сделать функцию получения ссылок. Записать результат в переменную. Сделать функцию отделения из файла значений свойства category в отдельный массив. Этот массив использовать для формирования разделов для ссылок. В дальнейшем отображать ссылки в тех раздела, которые указанны в них
  data = data.sort((a, b) => {
    if (a.category < b.category) {
      return -1;
    }
  });

  console.log(data);

  let markup = "";

  links.links.forEach((element) => {
    markup = markup + linkCard(element);
  });

  grid.innerHTML = markup;
}
