import moment from "moment";
import {ACTIVITIES, DateFormat} from "../consts.js";

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
  const sourceDate = moment(date);
  switch (option) {
    case DateFormat.TIME:
      return sourceDate.format(`HH:mm`);
    case DateFormat.FULL:
      return sourceDate.format(`DD/MM/YYYY HH:mm`);
    case DateFormat.MONTH:
      return sourceDate.format(`MMM DD`);
    case DateFormat.TO_ISO:
      return sourceDate.format(`YYYY-MM-DD`);
    default:
      return date;
  }
};
