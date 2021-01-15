export const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

export const OFFERS = [
  {title: `Add luggage`, price: 30, type: `luggage`},
  {title: `Switch to comfort class`, price: 50, type: `comfort`},
  {title: `Add meal`, price: 10, type: `meal`},
  {title: `Travel by train`, price: 10, type: `train`},
  {title: `Choose seats`, price: 10, type: `seat`},
];
export const ACTIVITIES = [`sightseeing`, `restaurant`, `check-in`];
export const TRANSPORTS = [`taxi`, `bus`, `train`, `ship`, `drive`, `flight`];

export const EventCategory = {
  TRANSFER: `transfers`,
  ACTIVITY: `activities`
};

export const DateFormat = {
  DAY: `day`,
  TIME: `time`,
  FULL: `full`,
  MONTH: `month`,
  TO_ISO: `iso`
};

export const SortType = {
  DEFAULT: `default`,
  TIME_DOWN: `time-down`,
  PRICE_DOWN: `price-down`
};

export const FilterType = {
  EVERYTHING: `everything`,
  TODAY: `today`,
  FUTURE: `future`
};

export const UserAction = {
  UPDATE_TRIP: `update`,
  ADD_TRIP: `add`,
  DELETE_TRIP: `delete`,
  CHANGE_FILTER: `changeFilter`,
  INIT: `init`
};

export const ButtonItem = {
  ADD_TRIP: `add`
};

export const MenuItem = {
  TRIP: `trip`,
  TABLE: `table`,
  STATS: `stats`
};
