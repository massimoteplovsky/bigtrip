import {createElement} from "../utils.js";

const createFilterTemplate = (filters) => {

  const createFilterItemTemplate = () => {
    return filters.map(({title}, index) => (
      `<div class="trip-filters__filter">
        <input
          id="filter-${title}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${title}"
          ${index === 0 ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${title}">${title}</label>
      </div>`
    )).join(``);
  };

  return (
    `<form class="trip-filters" action="#" method="get">
      ${createFilterItemTemplate(filters)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
