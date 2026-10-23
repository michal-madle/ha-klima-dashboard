import { HaKlimaDashboard } from "./ha-klima-dashboard";

if (!customElements.get("ha-klima-dashboard")) {
  customElements.define("ha-klima-dashboard", HaKlimaDashboard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-klima-dashboard")) {
  window.customCards.push({
    type: "ha-klima-dashboard",
    name: "Klima Dashboard",
    description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
    preview: false,
  });
}
