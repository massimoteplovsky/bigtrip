import flatpickr from "flatpickr";
import AbstractSmartComponent from "./abstract-smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TRANSPORTS} from "../consts.js";
import {countTripDuration} from "../utils/trip.js";

const BAR_HEIGHT = 55;

const sortTrip = (trips) => Object.entries(trips).sort((tripA, tripB) => tripB[1] - tripA[1]);

const countMoneyByTripType = (trips) => {
  const tripsMoney = trips.reduce((acc, nextTrip) => {
    const tripType = nextTrip.type;
    const tripPrice = nextTrip.basePrice;

    if (!acc[tripType]) {
      acc[tripType] = tripPrice;
      return acc;
    }

    acc[tripType] += tripPrice;
    return acc;

  }, []);

  return sortTrip(tripsMoney);
};

const countTransport = (trips) => {
  const transports = trips.reduce((acc, nextTrip) => {
    const tripType = nextTrip.type;

    if (TRANSPORTS.includes(tripType)) {
      if (acc[tripType]) {
        acc[tripType] += 1;
        return acc;
      }

      acc[tripType] = 1;
    }

    return acc;
  }, {});

  return sortTrip(transports);
};

const countTimeSpent = (trips) => {
  const tripsDuration = trips.reduce((acc, nextTrip) => {
    const tripType = nextTrip.type;
    const dateFrom = nextTrip.dateFrom;
    const dateTo = nextTrip.dateTo;
    const duration = Math.floor(countTripDuration(dateFrom, dateTo) / 60);

    if (!acc[tripType]) {
      acc[tripType] = duration;
      return acc;
    }

    acc[tripType] += duration;
    return acc;
  }, []);

  return sortTrip(tripsDuration);
};

const renderMoneyChart = (moneyCtx, trips) => {
  moneyCtx.height = BAR_HEIGHT * 6;
  const tripsData = countMoneyByTripType(trips);
  const types = tripsData.map((trip) => trip[0].toUpperCase());
  const totalPrices = tripsData.map((trip) => trip[1]);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: totalPrices,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 36,
        minBarLength: 50
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpentChart = (timeSpentCtx, trips) => {
  timeSpentCtx.height = BAR_HEIGHT * 4;
  const tripsData = countTimeSpent(trips);
  const types = tripsData.map((trip) => trip[0].toUpperCase());
  const tripsTotalTimeSpent = tripsData.map((trip) => trip[1]);

  return new Chart(timeSpentCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: tripsTotalTimeSpent,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 36,
        minBarLength: 50
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}h`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, trips) => {
  transportCtx.height = BAR_HEIGHT * 4;
  const tripsData = countTransport(trips);
  const types = tripsData.map((trip) => trip[0].toUpperCase());
  const totalTimes = tripsData.map((trip) => trip[1]);

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: totalTimes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 36
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {

  return (
    `<section class="statistics">
      <h2>Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(trips) {
    super();

    this._data = {
      trips
    };

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._setCharts(trips);
  }

  removeElement() {
    super.removeElement();

    if (this._colorsCart !== null || this._daysChart !== null) {
      this._colorsCart = null;
      this._daysChart = null;
    }

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts(trips) {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpentChart !== null) {
      this._colorsCart = null;
      this._daysChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, trips);
    this._transportChart = renderTransportChart(transportCtx, trips);
    this._timeSpentChart = renderTimeSpentChart(timeSpentCtx, trips);
  }
}
