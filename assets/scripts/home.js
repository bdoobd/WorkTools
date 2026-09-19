// const TLS = "ToolBoxLinks";

const linkData = async function getLinkData() {
  const linkFile = "assets/json/home.json";

  try {
    const response = await fetch(linkFile);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return { error: "Failed to load link data" };
  }
};

const linkCard = function (data) {
  return `
    <div class="card__link">
      <div class="card__header">
        <h3><a href="${data.url}" target="_blank">${data.title}</a></h3>
      </div>
      <div class="card__body">
        <em>${data.description}</em>
      </div>
    </div>
  `;
};

function categories(inputArray) {
  let cats = [];

  inputArray.forEach((obj) => {
    cats.push(obj.category);
  });

  return cats.filter(
    (element, index, array) => index === array.indexOf(element),
  );
}

function createMarkup(data) {
  let markup = "";

  categories(data).forEach((category) => {
    markup += `
      <div class="card__category">
        <div class="card__category__header">
          <h3>${category}</h3>
        </div>
        <div class="card__category__list">`;

    data
      .filter((item) => item.category === category)
      .forEach((item) => (markup += linkCard(item)));

    markup += `</div>
      </div>
    `;
  });
  return markup;
}

export async function initHome() {
  const grid = document.getElementById("links-grid");
  const links = await linkData();

  let data = links.links;

  const output = createMarkup(data);

  grid.innerHTML = output;
}
