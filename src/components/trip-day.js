import Abstract from "./abstract.js";
import {formatDate} from "../utils/common.js";
import {DateFormat} from "../consts.js";

const createTripDayTemplate = (date, index = ``) => {
  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time
          class="day__date"
          datetime="${date ? formatDate(date, DateFormat.TO_ISO) : ``}"
        >
          ${date ? formatDate(date, DateFormat.MONTH) : ``}
        </time>
      </div>
    </li>`
  );
};

export default class TripDay extends Abstract {

  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._index);
  }

}
