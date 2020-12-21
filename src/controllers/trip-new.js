import TripEdit from "../components/trip-edit.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {generateId, getTodayDate, validateForm} from "../utils/trip.js";
import {UserAction, TYPES} from "../consts.js";
import {destinations} from "../mocks/trip.js";

const BLANK_TRIP = {
  type: TYPES[0],
  offers: [],
  destination: destinations[0],
  dateFrom: getTodayDate(),
  dateTo: getTodayDate(),
  basePrice: 0
};

export default class NewTripController {

  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._tripEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._closeEditFormHandler = this._closeEditFormHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._tripEditComponent !== null) {
      return;
    }

    this._tripEditComponent = new TripEdit(BLANK_TRIP, true);
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setCloseFormHandler(this._closeEditFormHandler);
    const tripDaysContainer = this._container.querySelector(`.trip-days`);

    render(this._container, this._tripEditComponent, RenderPosition.BEFOREBEGIN, tripDaysContainer);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {

    if (this._tripEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closeEditFormHandler() {
    this.destroy();
  }

  _handleFormSubmit(trip) {
    const isValid = validateForm(trip);

    if (isValid) {
      this._changeData(
          UserAction.ADD_TRIP,
          Object.assign({id: generateId()}, trip)
      );
      this.destroy();
      return true;
    }

    return false;

  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
