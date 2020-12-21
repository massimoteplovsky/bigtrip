import FilterView from "../components/filter.js";
import {FilterType, UserAction} from "../consts.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export default class Filter {
  constructor(filterContainer, filterModel, tripModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tripModel = tripModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._tripModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    this._filterModel.setFilter(UserAction.CHANGE_FILTER, filterType);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: `Everything`
      },
      {
        type: FilterType.TODAY,
        name: `Today`
      },
      {
        type: FilterType.FUTURE,
        name: `Future`
      }
    ];
  }
}
