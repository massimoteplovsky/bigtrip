import flatpickr from "flatpickr";
import AbstractSmartComponent from "./abstract-smart.js";
import {TYPES, ACTIVITIES, EventCategory, DateFormat, CITIES} from "../consts.js";
import {capitalize, getPlaceholder, formatDate} from "../utils/common.js";
import {getOffers, destinations} from "../mocks/trip.js";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createTypeItemTransferTemplate = (eventCategory) => {
  return TYPES.reduce((acc, type) => {
    const template = `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
    </div>`;

    if (!ACTIVITIES.includes(type)) {
      acc.transfers.push(template);
    } else {
      acc.activities.push(template);
    }

    return acc;
  }, {
    activities: [],
    transfers: []
  })[eventCategory].join(``);
};

const createDestinationItemTemplate = () => CITIES.map((city) => `<option value=${city}></option>`);

const createOfferTemplate = ((offers) => {
  return offers.map(({title, price, type}) => (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${type}-1"
        type="checkbox"
        name="event-offer-${type}"
        ${Math.random() > 0.5 ? `checked` : ``}
      >
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  )).join(``);
});

const createOfferListTemplate = (offers) => {
  return offers.length > 0 ?
    (`<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createOfferTemplate(offers)}
        </div>
      </section>
    </section>`)
    : ``;
};

const createDestinationTemplate = (destination) => {

  if (!destination) {
    return ``;
  }

  const {
    description,
    pictures
  } = destination;

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((picture) => `<img class="event__photo" src=${picture} alt="Event photo"></img>`)}
        </div>
      </div>
    </section>`
  );
};

const createIsFavoriteTemplate = (isFavorite) => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`
  );
};

export const createAddEditTripTemplate = (trip, isNewTrip) => {

  const {
    type,
    offers,
    destination,
    dateFrom,
    dateTo,
    isFavorite,
    basePrice
  } = trip;

  const isFavoriteTemplateVisible = !isNewTrip ? createIsFavoriteTemplate(isFavorite) : ``;
  const buttonType = isNewTrip ? `<button class="event__reset-btn event__cancel-btn" type="button">Cancel</button>` : `<button class="event__reset-btn" type="button">Delete</button>`
  const isOpenBtnVisible = !isNewTrip ?
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` : ``;

  return (
    `<form class="event event--edit ${isNewTrip ? `trip-events__item` : ``}" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createTypeItemTransferTemplate(EventCategory.TRANSFER)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createTypeItemTransferTemplate(EventCategory.ACTIVITY)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group event__field-group--destination">
          <label class="event__label event__type-output" for="event-destination-1">
            ${capitalize(type)} ${getPlaceholder(type)}
          </label>
          <input
            class="event__input event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value=${destination ? destination.name : CITIES[0]}
          >
          <datalist id="destination-list-1">
            ${createDestinationItemTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormat.FULL)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormat.FULL)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min=0 name="event-price" value=${trip ? basePrice : ``}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${buttonType}
        ${isFavoriteTemplateVisible}
        ${isOpenBtnVisible}
      </header>

      ${createOfferListTemplate(offers)}
      ${createDestinationTemplate(destination)}
    </form>`
  );
};

export default class TripEdit extends AbstractSmartComponent {

  constructor(trip, isNewTrip = false) {
    super();
    this._data = trip;
    this._dateFrom = null;
    this._dateTo = null;
    this._isNewTrip = isNewTrip;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteTripHandler = this._deleteTripHandler.bind(this);
    this._editFormCloseHandler = this._editFormCloseHandler.bind(this);
    this._favoriteButtonToggleHandler = this._favoriteButtonToggleHandler.bind(this);
    this._changeTripTypeHandler = this._changeTripTypeHandler.bind(this);
    this._changeTripDestination = this._changeTripDestination.bind(this);
    this._changeDateFrom = this._changeDateFrom.bind(this);
    this._changeDateTo = this._changeDateTo.bind(this);
    this._changeTripPrice = this._changeTripPrice.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  getTemplate() {
    return createAddEditTripTemplate(this._data, this._isNewTrip);
  }

  _setDatepickers() {

    if (this._dateFrom) {
      this._dateFrom.destroy();
      this._dateFrom = null;
    }

    if (this._dateTo) {
      this._dateTo.destroy();
      this._dateTo = null;
    }

    this._dateFrom = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.dateFrom,
          enableTime: true,
          onChange: this._changeDateFrom
        }
    );

    this._dateTo = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.dateTo,
          enableTime: true,
          onChange: this._changeDateTo
        }
    );
  }

  _changeDateFrom([userDate]) {
    this.updateData({
      dateFrom: userDate
    });
  }

  _changeDateTo([userDate]) {
    this.updateData({
      dateTo: userDate
    });
  }

  _setInnerHandlers() {
    if (!this._isNewTrip) {
      this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteButtonToggleHandler);
    }

    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._changeTripTypeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._changeTripPrice);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._changeTripDestination);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`focus`, (evt) => {
      evt.target.value = ``;
    });
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`blur`, (evt) => {
      evt.target.value = this._data.destination.name;
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseFormHandler(this._callback.closeEditForm);
  }

  // Inner handlers
  _changeTripDestination(evt) {
    evt.preventDefault();
    const destinationCity = evt.target.value;

    if (!CITIES.includes(destinationCity)) {
      return;
    }

    this.updateData({
      destination: destinations.find((destination) => destination.name === destinationCity)
    });
  }

  _changeTripPrice(evt) {
    evt.preventDefault();
    const price = evt.target.value;
    this.updateData({basePrice: Number(price)});
  }

  _favoriteButtonToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _changeTripTypeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: getOffers()
    });
  }

  // External handlers
  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _deleteTripHandler(evt) {
    evt.preventDefault();
    this._callback.deleteTrip(this._data);
  }

  _editFormCloseHandler(evt) {
    evt.preventDefault();
    this._callback.closeEditForm();
  }

  // Handler setters
  setCloseFormHandler(callback) {
    this._callback.closeEditForm = callback;
    if (this._isNewTrip) {
      this.getElement().querySelector(`.event__cancel-btn`).addEventListener(`click`, this._editFormCloseHandler)
    } else {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editFormCloseHandler);
    }
  }

  setDeleteTripHandler(callback) {
    this._callback.deleteTrip = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteTripHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

}
