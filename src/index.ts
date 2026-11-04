import { HaKlimaDashboard } from "./ha-klima-dashboard";
import { getI18n, pageLanguage } from "./i18n";

if (!customElements.get("ha-klima-dashboard")) {
  customElements.define("ha-klima-dashboard", HaKlimaDashboard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-klima-dashboard")) {
  window.customCards.push({
    type: "ha-klima-dashboard",
    name: "Klima Dashboard",
    // The card picker has no `hass` yet: the language Home Assistant set on the page.
    description: getI18n(pageLanguage()).t.cardDescription,
    preview: false,
  });
}
