import flatpickr from "flatpickr";
import Abstract from "./abstract.js";
import {DateFormat} from "../consts.js";
import {capitalize, getPlaceholder, formatDate} from "../utils/common.js";
import {formatTripDuration} from "../utils/trip.js";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createOfferTemplate = (offers) => {
  return offers.map(({title, price}) => (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  )).slice(0, 3).join(``);
};

const createTripTemplate = (trip) => {

  const {
    type,
    offers,
    destination,
    dateFrom,
    dateTo,
    basePrice
  } = trip;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalize(type)} ${getPlaceholder(type)} ${destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${formatDate(dateFrom, DateFormat.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${formatDate(dateTo, DateFormat.TIME)}</time>
          </p>
          <p class="event__duration">${formatTripDuration(dateTo, dateFrom)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOfferTemplate(offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Trip extends Abstract {
  constructor(trip) {
    super();
    this._trip = trip;
    this._openEditFormHandler = this._openEditFormHandler.bind(this);
  }

  getTemplate() {
    return createTripTemplate(this._trip);
  }

  _openEditFormHandler(evt) {
    evt.preventDefault();
    this._callback.openEditForm();
  }

  setOpenEditFormHandler(callback) {
    this._callback.openEditForm = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._openEditFormHandler);
  }

}
