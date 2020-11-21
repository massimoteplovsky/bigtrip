import Abstract from "./abstract.js";

const createAddEventButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class AddEventButton extends Abstract {

  getTemplate() {
    return createAddEventButtonTemplate();
  }

}
