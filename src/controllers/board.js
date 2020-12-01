import TripDay from "../components/trip-day.js";
import TripList from "../components/trip-list.js";
import NoTrips from "../components/no-trips.js";
import Sort from "../components/sort.js";
import Container from "../components/container.js";
import TripController from "./trip.js";
import {
  getTripsByDate,
  getTripDates,
  sortTripByTime,
  sortTripByPrice,
  updateItem
} from "../utils/trip.js";
import {render} from "../utils/render.js";
import {SortType} from "../consts.js";


export default class BoardController {
  constructor(container) {
    this._container = container;
    this._tripController = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new Sort();
    this._tripListContainerComponent = new Container();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleTripDataChange = this._handleTripDataChange.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);
  }

  init(trips) {
    this._trips = [...trips];
    this._sourcedTrips = [...trips];
    this._renderBoard(trips);
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
        this._tasks = [...this._sourcedTrips];
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTrips(sortType);
    this._clearTripList();
    this._renderTripList();
  }

  _handleTripDataChange(updatedTrip) {
    this._trips = updateItem(this._trips, updatedTrip);
    this._sourcedTrips = updateItem(this._sourcedTrips, updatedTrip);
    this._tripController[updatedTrip.id].init(updatedTrip);
  }

  _handleViewChange() {
    Object.values(this._tripController).forEach((controller) => controller.setDefaultView());
  }

  _clearTripList() {
    this._tripListContainerComponent.getElement().innerHTML = ``;
  }

  _renderTrip(tripListComponent, trip) {
    const tripController = new TripController(tripListComponent, this._handleTripDataChange, this._handleViewChange);
    tripController.init(trip);
    this._tripController[trip.id] = tripController;
  }

  _renderSort() {
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripListContainer() {
    render(this._container, this._tripListContainerComponent);
  }

  _renderNoTrips() {
    render(this._tripEventsContainerElement, new NoTrips());
  }

  _renderBoard(trips) {
    if (trips.length === 0) {
      this._renderNoTrips();
      return;
    }

    this._renderSort();
    this._renderTripListContainer();
    this._renderTripList(trips);
  }

  _renderTripList(trips = this._trips) {

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

    trips.forEach((trip) => {
      const tripDayComponent = new TripDay();
      const tripListComponent = new TripList();

      render(this._tripListContainerComponent, tripDayComponent);
      render(tripDayComponent, tripListComponent);
      this._renderTrip(tripListComponent, trip);
    });

  }
}
