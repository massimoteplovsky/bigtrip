import TripEdit from "../components/trip-edit.js";
import {State} from "./trip.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {getTodayDate, validateForm} from "../utils/trip.js";
import {UserAction, TYPES} from "../consts.js";

export default class NewTripController {

  constructor(container, changeData, tripModel) {
    this._container = container;
    this._changeData = changeData;
    this._tripModel = tripModel;
    this._blankTrip = null;

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

    const [offers, destinations] = [this._tripModel.getOffers(), this._tripModel.getDestinations()];
    this._generateBlankTrip(offers, destinations);
    this._tripEditComponent = new TripEdit(this._blankTrip, {offers, destinations}, true);
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setCloseFormHandler(this._closeEditFormHandler);
    const tripDaysContainer = this._container.querySelector(`.trip-days`);

    render(this._container, this._tripEditComponent, RenderPosition.BEFOREBEGIN, tripDaysContainer);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  setViewState(state) {

    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripEditComponent.shake(resetFormState);
        break;
    }
  }

  _generateBlankTrip(offers, destinations) {

    this._blankTrip = {
      type: TYPES[0],
      offers: offers.filter((offer) => offer.type === TYPES[0])[0][`offers`],
      destination: destinations[0],
      dateFrom: getTodayDate(),
      dateTo: getTodayDate(),
      basePrice: 0
    };

    return this._blankTrip;
  }

  destroy() {

    if (this._tripEditComponent === null) {
      return;
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }
  }

  _closeEditFormHandler() {
    this.destroy();
  }

  _handleFormSubmit(trip) {
    const isValid = validateForm(trip);

    if (isValid) {
      this._changeData(UserAction.ADD_TRIP, trip);
      return true;
    }

    this.setViewState(State.ABORTING);

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
