import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

/**
 * Class representing the base store
 * @extends EventEmitter
 */
export default class Store extends EventEmitter {
  // Initializes the store object
  constructor() {
    super();
    this._store = {};
  }

  /**
   * Binds an event listener to the store's change event
   * @param {function} listener - the event listener to be bound
   */
  onChange(listener) { this.on(CHANGE_EVENT, listener); }

  /**
   * Unbinds an event listener from the store's change event
   * @param {function} listener - the event listener to be removed
   */
  offChange(listener) { this.removeListener(CHANGE_EVENT, listener); }

  // Emits a change event
  emitChange() { this.emit(CHANGE_EVENT); }
}
