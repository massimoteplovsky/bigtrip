import {createElement} from "../utils.js";

const createTripContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class Container {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripContainerTemplate();
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