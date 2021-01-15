import TripDay from "../components/trip-day.js";
import TripList from "../components/trip-list.js";
import NoTrips from "../components/no-trips.js";
import Sort from "../components/sort.js";
import Loading from "../components/loading.js";
import Container from "../components/container.js";
import TripController, {State} from "./trip.js";
import NewTripController from "./trip-new.js";
import {
  getTripsByDate,
  getTripDates,
  sortTripByTime,
  sortTripByPrice
} from "../utils/trip.js";
import {filter} from "../utils/filter.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {SortType, UserAction} from "../consts.js";


export default class BoardController {
  constructor(container, filterModel, tripModel, api) {
    this._container = container;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._tripController = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._loadingComponent = new Loading();
    this._sortComponent = new Sort(this._currentSortType);
    this._noTripsComponent = new NoTrips();
    this._tripListContainerComponent = new Container();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripNewController = new NewTripController(this._container, this._handleViewAction, this._tripModel);
  }

  init() {
    this._tripModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard();
    this._tripModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createTrip(callback) {
    remove(this._noTripsComponent);
    this._tripNewController.init(callback);
  }

  _getTrips() {
    this._currentFilter = this._filterModel.getFilter();
    const trips = [...this._tripModel.getTrips()];
    const filteredTrips = filter[this._currentFilter](trips);

    return filteredTrips;
  }

  _sortTrips(sortType) {
    switch (sortType) {
      case SortType.TIME_DOWN:
        this._trips.sort(sortTripByTime);
        break;
      case SortType.PRICE_DOWN:
        this._trips.sort(sortTripByPrice);
        break;
      default:
        this._trips = this._sourcedTrips;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTrips(sortType);
    this._clearBoard(sortType);
    this._renderBoard();
  }

  _handleViewAction(actionType, data) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._tripController[data.id].setViewState(State.SAVING);
        this._api.updateTrip(data)
          .then((updatedTrip) => {
            this._tripModel.updateTrip(actionType, updatedTrip);
          })
          .catch(() => {
            this._tripController[data.id].setViewState(State.ABORTING);
          });
        break;
      case UserAction.ADD_TRIP:
        this._tripNewController.setViewState(State.SAVING);
        this._api.addTrip(data)
        .then((newTrip) => {
          this._tripModel.addTrip(actionType, newTrip);
        })
        .catch(() => {
          this._tripNewController.setViewState(State.ABORTING);
        });
        break;
      case UserAction.DELETE_TRIP:
        this._tripController[data.id].setViewState(State.DELETING);
        this._api.deleteTrip(data)
        .then(() => {
          this._tripModel.deleteTrip(actionType, data);
        })
        .catch(() => {
          this._tripController.setViewState(State.ABORTING);
        });
        break;
    }
  }

  _handleModelEvent(actionType) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._clearBoard(this._currentSortType);
        this._renderBoard();
        break;
      case UserAction.CHANGE_FILTER:
      case UserAction.ADD_TRIP:
      case UserAction.DELETE_TRIP:
        this._clearBoard();
        this._renderBoard();
        break;
      case UserAction.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleViewChange() {
    this._tripNewController.destroy();
    Object.values(this._tripController).forEach((controller) => controller.setDefaultView());
  }

  _renderTrip(tripListComponent, trip) {
    const tripController = new TripController(tripListComponent, this._handleViewAction, this._handleViewChange, this._tripModel);
    tripController.init(trip);
    this._tripController[trip.id] = tripController;
  }

  _renderSort(sortType) {
    this._sortComponent = new Sort(sortType);
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripListContainer() {
    render(this._container, this._tripListContainerComponent);
  }

  _renderNoTrips() {
    render(this._container, this._noTripsComponent);
  }

  _renderLoading() {
    render(this._container, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard(sortType = SortType.DEFAULT) {
    this._tripNewController.destroy();

    Object
      .values(this._tripController)
      .forEach((controller) => controller.destroy());
    this._tripController = {};

    remove(this._sortComponent);
    remove(this._tripListContainerComponent);
    remove(this._noTripsComponent);

    this._currentSortType = sortType;
  }

  _renderBoard() {

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    this._trips = this._getTrips();
    this._sourcedTrips = [...this._trips];

    if (this._trips.length === 0) {
      this._renderNoTrips();
      return;
    }

    this._renderSort(this._currentSortType);
    this._renderTripListContainer();
    this._renderTripList(this._trips);
  }

  _renderTripList(trips) {

    if (trips.length === 0) {
      this._renderNoTrips();
      return;
    }

    if (this._currentSortType === SortType.DEFAULT) {
      const eventDates = getTripDates(trips);

      eventDates.forEach((date, index) => {
        const tripDayComponent = new TripDay(date, ++index);
        const tripListComponent = new TripList();
        const tripList = getTripsByDate(trips, date);

        render(this._tripListContainerComponent, tripDayComponent);
        render(tripDayComponent, tripListComponent);
        tripList.forEach((trip) => this._renderTrip(tripListComponent, trip));
      });

      return;
    }

    this._sortTrips(this._currentSortType);

    this._trips.forEach((trip) => {
      const tripDayComponent = new TripDay();
      const tripListComponent = new TripList();

      render(this._tripListContainerComponent, tripDayComponent);
      render(tripDayComponent, tripListComponent);
      this._renderTrip(tripListComponent, trip);
    });

  }
}
