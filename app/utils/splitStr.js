/**
 * Splits a string into an array at the delimiter and filters empty parts
 * @param  {string} str - the string to split
 * @param  {string} [delimiter=' '] - the delimiter to split at
 * @return {string[]} the array of individual parts
 */
export default function splitStr(str, delimiter = ' ') {
  return str.split(delimiter).filter(Boolean);
}
