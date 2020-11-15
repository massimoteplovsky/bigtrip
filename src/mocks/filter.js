import moment from "moment";

const filterMap = {
  everything: (trips) => trips,
  future: (trips) => trips.filter((trip) => moment(trip.dateFrom).isAfter(moment())),
  past: (trips) => trips.filter((trip) => moment(trip.dateTo).isBefore(moment()))
};

export const generateFilters = (trips) => {
  return Object.entries(filterMap).map(([title, action]) => {
    return {
      title,
      trips: action(trips)
    };
  });
};
