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
        <h3><a href="#">Title</a></h3><h4>Category</h4>
      </div>
      <div class="card__body">
        Keikkalista is a tool used for managing and scheduling work shifts. It allows employees to view their assigned shifts, request changes, and communicate with their team. The platform helps streamline workforce management and improve communication within the organization.
      </div>
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

  console.log(links.links);

  let markup = "";

  for (let i = 1; i < 20; i++) {
    markup = markup + linkCard(links);
  }

  grid.innerHTML = markup;
}
