import Abstract from "./abstract.js";

const createTripContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class Container extends Abstract {

  getTemplate() {
    return createTripContainerTemplate();
  }

}
