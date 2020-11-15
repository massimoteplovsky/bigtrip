import {createTripInfoTemplate} from "./components/trip-info.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/trip-filter.js";
import {createSortTemplate} from "./components/trip-sorting.js";
import {createTripDayContainerTemplate} from "./components/trip-container.js";
import {createAddEventButtonTemplate} from "./components/add-event-button.js";
import {generateTrip} from "./mocks/trip.js";
import {generateFilters} from "./mocks/filter.js";
import {render} from "./utils.js";

const TRIP_COUNT = 15;
const trips = new Array(TRIP_COUNT).fill().map(generateTrip);
const filters = generateFilters(trips);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, createTripInfoTemplate(trips), `afterbegin`);
render(tripControlsElement.firstElementChild, createMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate(filters));
render(tripMainElement, createAddEventButtonTemplate());

const tripContainerElement = document.querySelector(`.trip-events`);

render(tripContainerElement, createSortTemplate());
render(tripContainerElement, createTripDayContainerTemplate(trips));


