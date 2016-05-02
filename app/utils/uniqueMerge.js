export default function uniqueMerge(...args) {
  return [...new Set([].concat(...args))];
}
