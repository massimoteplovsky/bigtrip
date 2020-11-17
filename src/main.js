import TripInfo from "./components/info.js";
import TripDay from "./components/trip-day.js";
import TripList from "./components/trip-list.js";
import TripEdit from "./components/trip-edit.js";
import NoTrips from "./components/no-trips.js";
import Menu from "./components/menu.js";
import Filter from "./components/filter.js";
import Sort from "./components/sort.js";
import Container from "./components/container.js";
import AddEventButton from "./components/add-event-button.js";
import {generateTrip} from "./mocks/trip.js";
import {generateFilters} from "./mocks/filter.js";
import {
  render,
  RenderPosition,
  getTripDates,
  getTripsByDate
} from "./utils.js";
import Trip from "./components/trip.js";


const TRIP_COUNT = 15;
const trips = new Array(TRIP_COUNT).fill().map(generateTrip);
const filters = generateFilters(trips);
const eventDates = getTripDates(trips);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsContainerElement = document.querySelector(`.trip-events`);

const renderTrip = (tripListComponent, trip) => {
  const tripComponent = new Trip(trip);
  const tripEditComponent = new TripEdit(trip);

  const replaceTripToEdit = () => {
    tripListComponent.replaceChild(tripEditComponent.getElement(), tripComponent.getElement());
  };

  const replaceEditFormToTrip = () => {
    tripListComponent.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
  };

  const closeEditFormHandler = (evt) => {
    evt.preventDefault();
    replaceEditFormToTrip();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closeEditFormHandler(evt);
    }
  };

  tripComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceTripToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, closeEditFormHandler);

  tripEditComponent.getElement().addEventListener(`submit`, closeEditFormHandler);

  render(tripListComponent, tripComponent.getElement());
};

const tripInfoComponent =
new TripInfo(trips);
const menuComponent = new Menu();
const filterComponent = new Filter(filters);
const addEventButtonComponent = new AddEventButton();
const sortComponent = new Sort();
const tripListContainerComponent = new Container();

render(tripMainElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, menuComponent.getElement());
render(tripControlsElement, filterComponent.getElement());
render(tripMainElement, addEventButtonComponent.getElement());

if (trips.length === 0) {
  render(tripEventsContainerElement, new NoTrips().getElement());
} else {
  render(tripEventsContainerElement, sortComponent.getElement());
  render(tripEventsContainerElement, tripListContainerComponent.getElement());

  for (let i = 0; i < eventDates.length; i++) {
    const tripDayComponent = new TripDay(eventDates[i], i);
    const tripListComponent = new TripList();
    const tripList = getTripsByDate(trips, eventDates[i]);
    render(tripListContainerComponent.getElement(), tripDayComponent.getElement());
    render(tripDayComponent.getElement(), tripListComponent.getElement());
    tripList.forEach((trip) => renderTrip(tripListComponent.getElement(), trip));
  }
}
