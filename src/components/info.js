import Abstract from "./abstract.js";
import {sortByTimeFrom, sortByTimeEnd} from "../utils/trip.js";
import {getDatesRange} from "../utils/common.js";

const createTripInfoTemplate = (trips) => {

  const generateTripInfoTitle = () => {
    const cities = [...new Set(trips.map((trip) => trip.destination.name))];

    if (cities.length > 3) {
      return `${cities[0]} &mdash; . . . &mdash; ${cities[cities.length - 1]}`;
    }

    return cities.map((city, index) => {
      if (index === cities.length - 1) {
        return city;
      }
      return `${city} &mdash; `;
    }).join(``);
  };

  const generateTotalCost = () => {
    return trips.reduce((total, trip) => {
      total += trip.basePrice;
      return total;
    }, 0);
  };

  const getTripDates = () => {

    const startDate = trips.sort(sortByTimeFrom)[0].dateFrom;
    const endDate = trips.sort(sortByTimeEnd)[0].dateTo;

    //const isDatesSame = moment(startDate).isSame(endDate);

    return getDatesRange(startDate, endDate);
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${generateTripInfoTitle()}</h1>
          <p class="trip-info__dates">${getTripDates()}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${generateTotalCost()}</span>
        </p>
    </section>`
  );
};

export default class TripInfo extends Abstract {

  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trips);
  }

}
