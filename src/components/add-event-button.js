import Abstract from "./abstract.js";

const createAddEventButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class AddEventButton extends Abstract {

  constructor() {
    super();
    this._handleAddTripForm = this._handleAddTripForm.bind(this);
  }

  getTemplate() {
    return createAddEventButtonTemplate();
  }

  _handleAddTripForm(evt) {
    evt.preventDefault();
    this._callback.showAddTripForm();
    this.getElement().disabled = true;
  }

  setButtonClickHandler(callback) {
    this._callback.showAddTripForm = callback;
    this.getElement().addEventListener(`click`, this._handleAddTripForm);
  }

}
