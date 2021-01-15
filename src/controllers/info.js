import TripInfo from "../components/info.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export default class Info {
  constructor(container, tripModel) {
    this._container = container;
    this._tripModel = tripModel;
    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._tripModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }

  init() {
    const trips = this._tripModel.getTrips();

    if (trips.length === 0) {
      return;
    }

    const prevInfoComponent = this._infoComponent;
    this._infoComponent = new TripInfo(trips);

    if (prevInfoComponent === null) {
      render(this._container, this._infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }
}
