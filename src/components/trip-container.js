import moment from "moment";
import {createTripTemplate} from "./trip.js";
import {createAddEditTripTemplate} from "./trip-edit.js";
import {DateFormat} from "../consts.js";
import {formatDate, getTripDates} from "../utils.js";

const createTripListTemplate = (eventDate, trips, dayIndex) => {
  const tripList = trips.filter((trip) => moment(trip.dateFrom, `YYYY-MM-DD`).isSame(eventDate));
  return (
    `<ul class="trip-events__list">
      ${tripList.map((trip, index) => {
      if (dayIndex === 0 && index === 0) {
        return createAddEditTripTemplate(trip);
      }
      return createTripTemplate(trip);
    }).join(``)}
    </ul>`
  );
};

const createTripDayItemTemplate = (eventDates, trips) => {
  return eventDates.map((date, index) => (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="2019-03-18">${formatDate(date, DateFormat.MONTH)}</time>
      </div>
      ${createTripListTemplate(date, trips, index)}
    </li>`)).join(``);
};

export const createTripDayContainerTemplate = (trips) => {
  const eventDates = getTripDates(trips);

  return (
    `<ul class="trip-days">
      ${createTripDayItemTemplate(eventDates, trips)}
    </ul>`
  );
};
