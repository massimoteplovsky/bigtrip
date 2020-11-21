import TripInfo from "./components/info.js";
import Menu from "./components/menu.js";
import Filter from "./components/filter.js";
import AddEventButton from "./components/add-event-button.js";
import {generateTrip} from "./mocks/trip.js";
import {generateFilters} from "./mocks/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import TripController from "./controllers/trip.js";

const TRIP_COUNT = 15;
const trips = new Array(TRIP_COUNT).fill().map(generateTrip);
const filters = generateFilters(trips);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsContainerElement = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfo(trips);
const menuComponent = new Menu();
const filterComponent = new Filter(filters);
const addEventButtonComponent = new AddEventButton();

render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripControlsElement, menuComponent);
render(tripControlsElement, filterComponent);
render(tripMainElement, addEventButtonComponent);

const tripController = new TripController(tripEventsContainerElement);
tripController.init(trips);
