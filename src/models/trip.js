import Observer from "../utils/observer.js";

export default class TripModel extends Observer {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(trips) {
    this._trips = trips.slice();
  }

  getTrips() {
    return this._trips;
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
}
