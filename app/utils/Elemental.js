import { splitStr } from '.';

/**
 * Elemental allows you to create synthetic elements that have an api for adding
 * classes, inserting text, etc, but render out as a string and avoid using the
 * DOM api. (Made for use with DraftJS)
 */
export default class Elemental {

  /**
   * createElement is a factory for creating new Elemental objects
   * @param  {Object} param - destructured object
   * @param  {Object} [param.type] - the element type to generate
   * @return {Elemental} a new instance of Elemental
   */
  static createElement({ type, classes, className, alwaysWrap = false } = {}) {
    const instance = new Elemental();

    // set element type if supplied
    if (type && typeof type === 'string') instance.setType(type);

    const _classes = classes || className;

    // add classes if supplied
    if (_classes) instance.addClasses(_classes);

    // set alwaysWrap if supplied
    if (alwaysWrap) instance.alwaysWrap();

    return instance;
  }

  constructor() {
    this._type = 'span';
    this._classes = new Set();
    this._innerHTML = '';
    this._alwaysWrap = false;
  }

  /**
   * Set the type of html tag to wrap with
   * @param {string} type
   */
  setType(type) { this._type = type; }

  /**
   * Overwrites the innerHTML
   * @param {string} str
   */
  setText(str) { this._innerHTML = str; }

  /**
   * Sets whether or not to wrap the text with a tag if no classes are supplied
   * @param {boolean} [always=true]
   */
  alwaysWrap(always = true) { this._alwaysWrap = always; }

  /**
   * Overwrites all of the classes
   * @param {(string|string[])} classes - an array or space-separated string of
   * classes
   */
  setClasses(classes) {
    this._classes.clear();
    this.addClasses(classes);
  }

  /**
   * Adds one or more classes to the set of classes
   * @param {(string|string[])} _classes - an array or space-separated string of
   * classes
   */
  addClasses(_classes) {
    let classes = _classes;

    if (typeof classes === 'string') classes = splitStr(classes);

    classes.forEach(c => this._classes.add(c));
  }

  // alias addClasses
  addClass = this.addClasses

  /**
   * Removes one or more classes from the set of classes
   * @param {(string|string[])} _classes - an array or space-separated string of
   * classes
   */
  removeClasses(_classes) {
    let classes = _classes;

    if (typeof classes === 'string') classes = splitStr(classes);

    classes.forEach(c => this._classes.delete(c));
  }

  // alias removeClasses
  removeClass = this.removeClasses

  /**
   * Returns all classes joined with a single space
   * @return {string} space-separated list of css classes
   */
  getClassName() { return [...this._classes].join(' '); }

  /**
   * Checks to see if the elements classes contains a supplied class
   * @param  {string} className
   * @return {Boolean}
   */
  hasClass(className) { return this._classes.has(className); }

  /**
   * Adds a string to the innerHTML property
   * @param {string} str
   */
  addHTML(str) { this._innerHTML += str; }

  /**
   * Adds a newline to the innerHTML property
   */
  addNewLine() { this._innerHTML += '\n'; }

  /**
   * Describes how the class should be converted to a string
   * @return {string} the full output of the class
   */
  toString() {
    const className = this.getClassName();

    if (! this._alwaysWrap && ! className) return this._innerHTML;

    let retStr = `<${this._type}${className ? ` class="${className}"` : ''}>`;
    retStr += this._innerHTML;
    retStr += `</${this._type}>`;

    return retStr;
  }
}
