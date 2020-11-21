import Abstract from "./abstract.js";

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

export default class Filter extends Abstract {

  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

}
