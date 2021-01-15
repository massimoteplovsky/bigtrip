import TripModel from "./models/trip.js";
import {convertObjectKeys} from "./utils/api.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

export default class Api {

  constructor() {
    this._endPoint = END_POINT;
    this._authorization = AUTHORIZATION;
  }

  getTrips() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((trips) => convertObjectKeys(trips));
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON)
      .then((offers) => convertObjectKeys(offers));
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON)
      .then((destinations) => convertObjectKeys(destinations));
  }

  updateTrip(trip) {
    return this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(TripModel.adaptToServer(trip)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then((updatedTrip) => convertObjectKeys(updatedTrip));
  }

  addTrip(trip) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(TripModel.adaptToServer(trip)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then((newTrip) => convertObjectKeys(newTrip));
  }

  deleteTrip(trip) {
    return this._load({
      url: `points/${trip.id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
