import {createTripInfoTemplate} from "./components/trip-info.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/trip-filter.js";
import {createSortTemplate} from "./components/trip-sorting.js";
import {createAddEditTripTemplate} from "./components/trip-edit.js";
import {createTripContainer} from "./components/trip-container.js";
import {createTripTemplate} from "./components/trip.js";
import {createAddEventButtonTemplate} from "./components/add-event-button.js";

const TRIP_COUNT = 3;

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
render(tripControlsElement.firstElementChild, createMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate());
render(tripMainElement, createAddEventButtonTemplate());

const tripContainerElement = document.querySelector(`.trip-events`);

render(tripContainerElement, createSortTemplate());
render(tripContainerElement, createAddEditTripTemplate());
render(tripContainerElement, createTripContainer());

const tripItemList = tripContainerElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_COUNT; i++) {
  render(tripItemList, createTripTemplate());
}


