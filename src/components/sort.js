import Abstract from "./abstract.js";
import {SortType} from "../consts.js";

const createSortItemTemplate = () => {
  const sortItem = {
    event: {
      title: `event`,
      sortType: SortType.DEFAULT
    },
    time: {
      title: `time`,
      sortType: SortType.TIME_DOWN,
      icon: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>`
    },
    price: {
      title: `price`,
      sortType: SortType.PRICE_DOWN,
      icon: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>`
    }
  };

  return Object.keys(sortItem).map((item, index) => {
    const {title, icon = ``, sortType} = sortItem[item];

    return (
      `<div class="trip-sort__item  trip-sort__item--${title}">
        <input
          id="sort-${title}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${title}"
          ${index === 0 ? `checked` : ``}
        >
        <label
          class="trip-sort__btn"
          for="sort-${title}"
          data-sort-type="${sortType}"
        >
          ${title}
          ${icon}
        </label>
      </div>`
    );

  }).join(``);
};

const createSortTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${createSortItemTemplate()}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class TripInfo extends Abstract {

  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    const sortType = evt.target.dataset.sortType;

    this._callback.sortTypeChange(sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

}
