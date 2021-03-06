export const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
export const CITIES = [`Chamonix`, `Geneva`, `Amsterdam`];
export const DESCRIPTION = `Lorem ipsum dolorsit amet, consectetur adipiscing elit.Cras aliquet varius magna, non portaligula feugiat eget. Fusce tristiquefelis at fermentum pharetra. Aliquamid orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibuseget, sollicitudin eget ante.Phasellus eros mauris, condimentum sednibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, euluctus nunc ante ut dui. Sed sed nisised augue convallis suscipit in sedfelis. Aliquam erat volutpat. Nuncfermentum tortor ac porta dapibus. Inrutrum ac purus sit amet tempus`;
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
  CHANGE_FILTER: `changeFilter`
};

export const ButtonItem = {
  ADD_TRIP: `add`
};

export const MenuItem = {
  TRIP: `trip`,
  TABLE: `table`,
  STATS: `stats`
};
