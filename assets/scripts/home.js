const TLS = "ToolBoxLinks";

const defaultLinks = [
  {
    title: "Keikkalista",
    url: "https://atcglobalfi.sharepoint.com/:x:/r/sites/ATC/_layouts/15/doc2.aspx?sourcedoc=%7B51FC0E12-7655-47CF-8D82-03BC859B3F1A%7D&file=Esimerkki%20keikkalistasta.xlsx&action=default&mobileredirect=true&wdLOR=c2212BEFC-B005-CB4C-BB4C-33EBEC0D2C2E&cid=fa0221aa-b324-4059-912a-a9ddfbdb7ff5&CID=563D888B-17AF-4182-BB55-33658C8062F3",
    category: "Work",
    description:
      "Keikkalista is a tool used for managing and scheduling work shifts. It allows employees to view their assigned shifts, request changes, and communicate with their team. The platform helps streamline workforce management and improve communication within the organization.",
  },
  {
    title: "WhatsApp Web",
    url: "https://web.whatsapp.com/",
    category: "Communication",
    description:
      "WhatsApp Web allows you to send and receive WhatsApp messages from your computer. It mirrors conversations and messages from your mobile device, allowing you to stay connected without needing to pick up your phone.",
  },
];

export function initHome() {
  const addButton = document.getElementById("add-link-btn");
  if (!addButton) return;

  addButton.addEventListener("click", () => {
    console.log("Add link button clicked");
  });
}
