const STYLE_TYPES = {
  BOLD: ['<strong>', '</strong>'],
  ITALIC: ['<em>', '</em>'],
  UNDERLINE: ['<u>', '</u>'],
  CODE: ['<span class="mono">', '</span>'],
};

/**
 * Returns the opening tag for a given style
 *
 * @param {string} style
 * @returns {string} tag - An HTML snippet
 **/
function getOpeningTag(style) {
  const [tag] = STYLE_TYPES[style];
  return tag;
}

/**
 * Returns the closing tag for a given style
 *
 * @param {string} style
 * @returns {string} tag - An HTML snippet
 **/
function getClosingTag(style) {
  const [, tag] = STYLE_TYPES[style];
  return tag;
}

/**
 * Applies rich text inline styles to a text string
 *
 * @param {Object} param - destructured object
 * @param {string} param.text - text string to apply styles to
 * @param {Object[]} param.styles - Array of style object to apply
 **/
export function applyInlineStyles({ text, styles }) {
  const nest = [];
  const endMap = new Map();

  let retHTML = text;
  let leftPad = 0; // ;-D

  /**
   * Inserts an htmlString at a given position and adds the length of the new
   * htmlString to leftPad
   *
   * @param {string} htmlString
   * @param {number} pos - the position the new string should be inserted at
   **/
  const insertAtPos = (htmlString, pos) => {
    const _pos = pos + leftPad;

    // Insert new htmlString into HTML string
    const newHTML = `${retHTML.slice(0, _pos)}${htmlString}${retHTML.slice(_pos)}`;
    retHTML = newHTML;

    // Add to leftPad
    leftPad += htmlString.length;
  };

  const handleStyles = () => {
    const styleObj = styles[0];
    const openingTag = getOpeningTag(styleObj.style);

    // Add to the nest
    nest.push(styleObj);

    insertAtPos(openingTag, styleObj.offset);

    // Get the calculated end position for tag
    const endTagPos = styleObj.offset + styleObj.length;

    // If there is no array set for end position, create one
    if (! endMap.has(endTagPos)) endMap.set(endTagPos, []);

    // Add style object to endMap
    endMap.get(endTagPos).push(styleObj);

    // Shift the top style off the stack
    styles.shift();

    next();
  };

  const handleClosings = () => {
    const closestOffset = Math.min(...endMap.keys());
    const closestEnds = endMap.get(closestOffset);

    closestEnds.forEach((styleObj) => {
      nest.splice(nest.indexOf(styleObj), 1);

      const closingHTML = getClosingTag(styleObj.style);

      insertAtPos(closingHTML, styleObj.offset + styleObj.length);
    });

    endMap.delete(closestOffset);

    next();
  };

  const next = () => {
    if (styles.length) {
      handleStyles();
    } else if (nest.length) {
      handleClosings();
    }
  };

  next();

  console.log(retHTML);
  return retHTML;
}
