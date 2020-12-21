import moment from "moment";
import {FilterType} from "../consts.js";

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.TODAY]: (trips) => trips.filter((trip) => moment(trip.dateFrom).isSame(moment.now(), `day`)),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => moment(trip.dateFrom).isAfter(moment.now(), `day`))
};
