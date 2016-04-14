import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {
  store = {};

  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  offChange(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}
