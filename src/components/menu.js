import Abstract from "./abstract.js";
import {capitalize} from "../utils/common.js";

const createMenuItemTemplate = () => {
  const menuItems = [`table`, `stats`];
  return menuItems.map((item, index) => `<a class="trip-tabs__btn ${index === 0 ? `trip-tabs__btn--active` : ``}" href="#">${capitalize(item)}</a>`).join(``);
};

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${createMenuItemTemplate()}
    </nav>`
  );
};

export default class Menu extends Abstract {

  getTemplate() {
    return createMenuTemplate();
  }

}
