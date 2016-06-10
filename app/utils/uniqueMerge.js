/**
 * Combines multiple arrays into one and removes duplicate entires
 * @param  {...Array} args - a spread of arrays
 * @return {Array} an array with no duplicate elements
 */
export default function uniqueMerge(...args) {
  return [...new Set([].concat(...args))];
}
