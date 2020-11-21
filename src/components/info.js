import Abstract from "./abstract.js";

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

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${generateTripInfoTitle()}</h1>
          <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
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
