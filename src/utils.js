import moment from "moment";
import {ACTIVITIES, DateFormat} from "./consts.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const capitalize = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

export const getPlaceholder = (type) => {
  return ACTIVITIES.includes(type) ? `in` : `to`;
};

export const formatDate = (date, option) => {
  switch (option) {
    case DateFormat.TIME:
      return moment(date).format(`HH:mm`);
    case DateFormat.FULL:
      return moment(date).format(`DD/MM/YYYY HH:mm`);
    case DateFormat.MONTH:
      return moment(date).format(`MMM DD`);
    default:
      return date;
  }
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
  return [...new Set(trips.map((trip) => moment(trip.dateFrom).format(`YYYY-MM-DD`)).sort())];
};

export const getTripsByDate = (trips, eventDate) => trips.filter((trip) => moment(trip.dateFrom, `YYYY-MM-DD`).isSame(eventDate));
