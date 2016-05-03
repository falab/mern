import { splitStr } from '.';

export default class Elemental {
  static createElement({ type, classes, className } = {}) {
    const instance = new Elemental();

    if (type && typeof type === 'string') instance.setType(type);

    const _classes = classes || className;

    if (_classes) instance.addClasses(_classes);

    return instance;
  }

  constructor() {
    this._type = 'span';
    this._classes = new Set();
    this._innerText = '';
  }

  setType(type) {
    this._type = type;
  }

  addClasses(_classes) {
    let classes = _classes;

    if (typeof classes === 'string') {
      classes = splitStr(classes);
    }

    classes.forEach((c) => this._classes.add(c));
  }

  // alias addClasses
  addClass = this.addClasses

  removeClasses(_classes) {
    let classes = _classes;

    if (typeof classes === 'string') {
      classes = splitStr(classes);
    }

    classes.forEach((c) => this._classes.remove(c));
  }

  // alias removeClasses
  removeClass = this.removeClasses

  getClassName() {
    return [...this._classes].join(' ');
  }

  addText(str) {
    this._innerText += str;
  }

  toString() {
    const className = this.getClassName();

    if (! className) return this._innerText;

    return `<${this._type} class="${className}">${this._innerText}</${this._type}>`;
  }
}
