import TripEdit from "../components/trip-edit.js";
import Trip from "../components/trip.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import {UserAction} from "../consts.js";
import {validateForm} from "../utils/trip.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class TripController {
  constructor(container, changeData, onViewChange, tripModel) {
    this._container = container;
    this.changeData = changeData;
    this._onViewChange = onViewChange;
    this._tripModel = tripModel;
    this._tripComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._openEditFormHandler = this._openEditFormHandler.bind(this);
    this._closeEditFormHandler = this._closeEditFormHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._deleteTripHandler = this._deleteTripHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(trip) {
    const prevTripComponent = this._tripComponent;
    const prevTripEditComponent = this._tripEditComponent;
    const [offers, destinations] = [this._tripModel.getOffers(), this._tripModel.getDestinations()];

    this._trip = trip;
    this._tripComponent = new Trip(trip);
    this._tripEditComponent = new TripEdit(trip, {offers, destinations});

    this._tripComponent.setOpenEditFormHandler(this._openEditFormHandler);
    this._tripEditComponent.setCloseFormHandler(this._closeEditFormHandler);
    this._tripEditComponent.setDeleteTripHandler(this._deleteTripHandler);
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this._container, this._tripComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._container.getElement().contains(prevTripComponent.getElement())) {
      replace(this._tripComponent, prevTripComponent);
    }

    if (this._container.getElement().contains(prevTripEditComponent.getElement())) {
      replace(this._tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
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
        this._tripComponent.shake(resetFormState);
        this._tripEditComponent.shake(resetFormState);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeEditFormHandler();
    }
  }

  destroy() {
    remove(this._tripComponent);
    remove(this._tripEditComponent);
  }

  // Handlers
  _closeEditFormHandler() {
    this._tripEditComponent.reset(this._trip);
    replace(this._tripComponent, this._tripEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _deleteTripHandler(trip) {
    this.changeData(UserAction.DELETE_TRIP, trip);
  }

  _openEditFormHandler() {
    replace(this._tripEditComponent, this._tripComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._onViewChange();
    this._mode = Mode.EDITING;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEditComponent.reset(this._trip);
      this._closeEditFormHandler(evt);
    }
  }

  _handleFormSubmit(trip) {
    const isValid = validateForm(trip);

    if (isValid) {
      this.changeData(UserAction.UPDATE_TRIP, trip);
      this._closeEditFormHandler();
      return true;
    }

    this.setViewState(State.ABORTING);

    return false;
  }
}
