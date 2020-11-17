import {createElement, capitalize} from "../utils.js";

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

export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
