import {createElement} from "../utils.js";

const createSortItemTemplate = () => {
  const sortItem = {
    event: {
      title: `event`
    },
    time: {
      title: `time`,
      icon: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>`
    },
    price: {
      title: `price`,
      icon: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>`
    }
  };

  return Object.keys(sortItem).map((item) => {
    const {title, icon = ``} = sortItem[item];

    return (
      `<div class="trip-sort__item  trip-sort__item--${title}">
        <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}">
        <label class="trip-sort__btn" for="sort-${title}">
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

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
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
