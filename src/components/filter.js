import Abstract from "./abstract.js";

const createFilterTemplate = (filters, currentFilter) => {

  const createFilterItemTemplate = () => {
    return filters.map(({type, tripsCount}) => (
      `<div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${type === currentFilter ? `checked` : ``}
          ${tripsCount === 0 ? `disabled` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
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

  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _handleFilterTypeChange(evt) {
    evt.preventDefault();
    this._callback.changeFilterType(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.changeFilterType = callback;
    this.getElement().addEventListener(`change`, this._handleFilterTypeChange);
  }

}
