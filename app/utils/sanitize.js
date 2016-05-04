const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

/**
 * Regular expression that will match html tags and comments
 */
const tagOrComment = new RegExp([
  '<(?:',
  // Comment body.
  '!--(?:(?:-*[^->])*--+|-?)',
  // Special "raw text" elements whose content should be elided.
  `|script\\b${tagBody}>[\\s\\S]*?</script\\s*`,
  `|style\\b${tagBody}>[\\s\\S]*?</style\\s*`,
  // Regular name
  '|/?[a-z]',
  tagBody,
  ')>',
].join(''), 'gi');

/**
 * Removes html tags and comments from a string
 * @param  {string} _str - the string you want to sanitize
 * @return {string} the sanitized string
 */
export default function sanitize(_str) {
  let oldStr;
  let str = _str;

  do {
    oldStr = str;
    str = str.replace(tagOrComment, '');
  } while (str !== oldStr);

  return str.replace(/</g, '&lt;');
}
