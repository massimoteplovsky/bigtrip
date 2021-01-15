import Menu from "./components/menu.js";
import AddEventButton from "./components/add-event-button.js";
import Statistics from "./components/statistics.js";
import TripModel from "./models/trip.js";
import FilterModel from "./models/filter.js";
import {render, remove, RenderPosition} from "./utils/render.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import InfoController from "./controllers/info.js";
import Api from "./api.js";
import {UserAction, FilterType, MenuItem} from "./consts.js";

const api = new Api();

const tripModel = new TripModel();
const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);
const pageContainer = document.querySelector(`.page-main .page-body__container`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsContainerElement = document.querySelector(`.trip-events`);

// const tripInfoComponent = new TripInfo();
const menuComponent = new Menu();
const addEventButtonComponent = new AddEventButton();

// render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripControlsElement, menuComponent);
render(tripMainElement, addEventButtonComponent);

const infoController = new InfoController(tripMainElement, tripModel);
const boardController = new BoardController(tripEventsContainerElement, filterModel, tripModel, api);
const filterController = new FilterController(tripControlsElement, filterModel, tripModel);

const handleButtonDisabled = () => {
  addEventButtonComponent.getElement().disabled = false;
  boardController.destroy();
  boardController.init();
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      boardController.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      boardController.destroy();
      statisticsComponent = new Statistics(tripModel.getTrips());
      render(pageContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

const showAddTripForm = () => {

  if (statisticsComponent !== null) {
    remove(statisticsComponent);
  }

  menuComponent.setMenuItem(MenuItem.TABLE);
  boardController.destroy();
  filterModel.setFilter(UserAction.CHANGE_FILTER, FilterType.EVERYTHING);
  boardController.init();
  boardController.createTrip(handleButtonDisabled);
};

addEventButtonComponent.setButtonClickHandler(showAddTripForm);

infoController.init();
boardController.init();
filterController.init();

Promise.all([
  api.getTrips(),
  api.getOffers(),
  api.getDestinations()
]).then((data) => tripModel.setData(UserAction.INIT, data));
