import Store from './Store';

import AppDispatcher from '../dispatchers/AppDispatcher';
import PortfolioConstants from '../constants/PortfolioConstants';
import * as PortfolioActions from '../actions/PortfolioActions';

/**
 * Class representing the portfolio store
 * @extends Store
 */
class PortfolioStore extends Store {
  constructor() {
    super();
    this._store.items = [
      { _id: 1 },
      { _id: 2 },
      { _id: 3 },
    ];
    PortfolioActions.getItems();
  }
  getItems(count = 0, _page = 0) {
    let page = _page;
    let items = this._store.items;

    const maxPage = Math.ceil(items.length / count);

    if (count) {
      if (page > maxPage) page = maxPage;

      const start = (page - 1) * count;
      const end = start + count;

      items = items.slice(start, end);
    }

    return items;
  }
  /**
   * Implements a switch to route different event types to different methods.
   * Will be passed to the AppDispatcher.
   * @param {Object} param - destructured object
   * @param {Object} param.action - the action object from the dispatcher
   * @param {string} param.action.type - the action type
   * @param {*}      param.action.response - the response for the action
   */
  dispatchHandler = ({ action: { type, response } }) => {
    switch (type) {
      case PortfolioConstants.ITEM_CREATE_RESPONSE:
        this.handleItemCreateResponse(response);
        break;

      case PortfolioConstants.ITEM_DELETE_RESPONSE:
        this.handleItemDeleteResponse(response);
        break;

      case PortfolioConstants.ITEMS_FETCH_RESPONSE:
        this.handleItemsFetchResponse(response);
        break;

      default: // do nothing
    }
  }
}

// Instantiate the store before exporting
const portfolioStore = new PortfolioStore;

// Register dispatch handler
AppDispatcher.register(portfolioStore.dispatchHandler);

export default portfolioStore;
