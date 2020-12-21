import Abstract from "./abstract.js";
import {capitalize} from "../utils/common.js";

const createMenuItemTemplate = () => {
  const menuItems = [`table`, `stats`];
  return menuItems.map((item, index) => `<a class="trip-tabs__btn ${index === 0 ? `trip-tabs__btn--active` : ``}" href="#" data-name=${item}>${capitalize(item)}</a>`).join(``);
};

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs trip-tabs">
      ${createMenuItemTemplate()}
    </nav>`
  );
};

export default class Menu extends Abstract {

  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    const menuItem = evt.target.dataset.name;
    this._callback.menuClick(menuItem);
    this.setMenuItem(menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    activeItem.classList.remove(`trip-tabs__btn--active`)

    this.getElement().querySelector(`[data-name=${menuItem}]`).classList.add(`trip-tabs__btn--active`);
  }

}
