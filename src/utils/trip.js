import moment from "moment";
import Api from "../api.js";
import {formatDate} from "./common.js";
import {DateFormat} from "../consts.js";
import cloneDeep from 'lodash.clonedeep';

const api = new Api();

export const offers = api.getOffers((offersList) => offersList);

export const sortTripByTime = (tripA, tripB) => {
  return countTripDuration(tripB.dateTo, tripB.dateFrom) - countTripDuration(tripA.dateTo, tripA.dateFrom);
};

export const sortByTimeFrom = (tripA, tripB) => {
  return moment(tripA.dateFrom).diff(tripB.dateFrom);
};

export const sortByTimeEnd = (tripA, tripB) => {
  return moment(tripB.dateTo).diff(tripA.dateTo);
};

export const sortTripByPrice = (tripA, tripB) => {
  return tripB.basePrice - tripA.basePrice;
};

export const getTodayDate = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return new Date(currentDate);
};

export const countTripDuration = (dateTo, dateFrom) => moment(dateTo).diff(dateFrom, `minutes`);

export const formatTripDuration = (dateTo, dateFrom) => {
  const hour = 60;
  const day = 24 * 60;
  const duration = countTripDuration(dateTo, dateFrom);

  if (duration >= hour && duration < day) {
    return `${Math.floor(duration / hour)}H ${duration % hour}M`;
  }

  if (duration >= day) {
    return `${Math.floor(duration / day)}D ${Math.floor((duration % day) / hour)}H ${Math.floor((duration % day) % hour)}M`;
  }

  return `${duration}M`;
};

export const getTripDates = (trips) => {
  return [...new Set(trips.map((trip) => formatDate(trip.dateFrom, DateFormat.TO_ISO)).sort())];
};

export const getTripsByDate = (trips, eventDate) => trips.filter((trip) => formatDate(trip.dateFrom, DateFormat.TO_ISO) === eventDate);

export const updateItem = (trips, updatedTrip) => {
  const tripIndex = trips.findIndex((trip) => trip.id === updatedTrip.id);

  if (tripIndex === -1) {
    return trips;
  }

  return [
    ...trips.slice(0, tripIndex),
    updatedTrip,
    ...trips.slice(tripIndex + 1)
  ];
};

export const validateForm = (trip) => {
  const {dateFrom, dateTo} = trip;

  if (moment(dateTo).isSameOrBefore(dateFrom)) {
    return false;
  }

  return true;
};

export const clone = (obj) => {
  return cloneDeep(obj);
};
