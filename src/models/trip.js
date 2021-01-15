import Observer from "../utils/observer.js";

export default class TripModel extends Observer {

  constructor() {
    super();
    this._trips = [];
    this._offers = [];
    this._destinations = [];
  }

  setData(updateType, data) {
    const [trips = [], offers = [], destinations = []] = data;
    this._trips = [...trips];
    this._offers = [...offers];
    this._destinations = [...destinations];

    this._notify(updateType);
  }

  getTrips() {
    return this._trips;
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  updateTrip(updateType, data) {
    const index = this._trips.findIndex((trip) => trip.id === data.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      data,
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType, data);
  }

  addTrip(updateType, data) {
    this._trips = [
      data,
      ...this._trips
    ];

    this._notify(updateType, data);
  }

  deleteTrip(updateType, data) {
    const index = this._trips.findIndex((trip) => trip.id === data.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          basePrice: trip.base_price,
          dateFrom: trip.date_from,
          dateTo: trip.date_to,
          isFavorite: trip.is_favorite
        }
    );

    delete adaptedTrip.base_price;
    delete adaptedTrip.date_from;
    delete adaptedTrip.date_to;
    delete adaptedTrip.is_favorite;

    return adaptedTrip;
  }

  static adaptToServer(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          "base_price": trip.basePrice,
          "is_favorite": trip.isFavorite ? true : false,
          "date_from": trip.dateFrom,
          "date_to": trip.dateTo
        }
    );

    delete adaptedTrip.basePrice;
    delete adaptedTrip.isFavorite;
    delete adaptedTrip.dateFrom;
    delete adaptedTrip.dateTo;
    delete adaptedTrip.isDeleting;
    delete adaptedTrip.isDisable;
    delete adaptedTrip.isSaving;

    return adaptedTrip;
  }
}
