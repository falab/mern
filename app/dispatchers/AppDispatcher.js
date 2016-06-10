import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  viewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action,
    });
  }

  serverAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action,
    });
  }
}

export default new AppDispatcher();
