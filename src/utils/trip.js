import moment from "moment";
import {formatDate} from "./common.js";
import {DateFormat} from "../consts.js";

export const sortTripByTime = (tripA, tripB) => {
  return countTripDuration(tripB.dateTo, tripB.dateFrom) - countTripDuration(tripA.dateTo, tripA.dateFrom);
};

export const sortTripByPrice = (tripA, tripB) => {
  return tripB.basePrice - tripA.basePrice;
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

export const getTripsByDate = (trips, eventDate) => trips.filter((trip) => moment(trip.dateFrom, `YYYY-MM-DD`).isSame(eventDate));
