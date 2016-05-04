const STYLE_TYPES = {
  BOLD: ['<strong>', '</strong>'],
  ITALIC: ['<em>', '</em>'],
  UNDERLINE: ['<u>', '</u>'],
  CODE: ['<span class="mono">', '</span>'],
};

/**
 * Returns the opening tag for a given style
 * @param {string} style
 * @returns {string} tag - An HTML snippet
 */
function getOpeningTag(style) {
  const [tag] = STYLE_TYPES[style];
  return tag;
}

/**
 * Returns the closing tag for a given style
 * @param {string} style
 * @returns {string} tag - An HTML snippet
 */
function getClosingTag(style) {
  const [, tag] = STYLE_TYPES[style];
  return tag;
}

function styleEndPos(styleObj) {
  return styleObj.offset + styleObj.length;
}

/**
 * Applies rich text inline styles to a text string
 * @param {Object} param - destructured object
 * @param {string} param.text - text string to apply styles to
 * @param {Object[]} param.styles - Array of style object to apply
 */
export default function applyInlineStyles({ text, inlineStyleRanges: _styles }) {
  const nest = [];
  const endMap = new Map();
  const styles = _styles.slice(0);

  let retHTML = text;
  let leftPad = 0; // ;-D

  /**
   * Inserts an htmlString at a given position and adds the length of the new
   * htmlString to leftPad
   * @param {string} htmlString
   * @param {number} pos - the position the new string should be inserted at
   */
  const insertAtPos = (htmlString, pos) => {
    const _pos = pos + leftPad;

    // Insert new htmlString into HTML string
    const newHTML = `${retHTML.slice(0, _pos)}${htmlString}${retHTML.slice(_pos)}`;
    retHTML = newHTML;

    // Add to leftPad
    leftPad += htmlString.length;
  };

  const handleStyle = (styleObj) => {
    const openingTag = getOpeningTag(styleObj.style);

    // Add to the nest
    nest.push(styleObj);

    insertAtPos(openingTag, styleObj.offset);

    // Get the calculated end position for tag
    const endTagPos = styleObj.offset + styleObj.length;

    // If there is no array set for end position, create one
    if (! endMap.has(endTagPos)) endMap.set(endTagPos, []);

    // Add style object to endMap
    endMap.get(endTagPos).unshift(styleObj);

    // Shift the top style off the stack
    styles.splice(styles.indexOf(styleObj), 1);

    next();
  };

  const deleteEnd = (styleObj) => {
    const endPosArr = endMap.get(styleEndPos(styleObj));
    endPosArr.splice(endPosArr.indexOf(styleObj), 1);
  };

  const handleOverlap = (outerStyle) => {
    let htmlString = '';

    const overlapFilter = (obj) => {
      // Filter same object
      if (obj === outerStyle) return false;

      // Filter styles opened BEFORE current style (even if on the same offset)
      if (_styles.indexOf(obj) < _styles.indexOf(outerStyle)) return false;

      const outerStyleEnd = styleEndPos(outerStyle);

      // Filter styles that end before outer style ends (pure nested)
      if (styleEndPos(obj) < outerStyleEnd) return false;

      // filter styles that start before current starts or after current ends
      if (obj.offset < outerStyle.offset || obj.offset > outerStyleEnd) {
        return false;
      }

      // Only overlapping styles that start after current style should remain
      return true;
    };

    // splice all overlapping styles from nest
    const overlapStyles = nest.filter(overlapFilter);

    // Early return if there are no overlapping styles
    if (! overlapStyles.length) return htmlString;

    while (overlapStyles.length > 0) {
      const styleObj = overlapStyles.pop();

      // Remove current style from nest
      nest.splice(nest.indexOf(styleObj), 1);

      // Delete original closing tag for overlapping style
      deleteEnd(styleObj);

      // add end tag to htmlString
      htmlString += getClosingTag(styleObj.style);

      // update style object to have new offset
      const parentEndPos = styleEndPos(outerStyle);

      styleObj.length -= parentEndPos - styleObj.offset;
      styleObj.offset = parentEndPos;

      // push updated style back into styles for later processing
      styles.unshift(styleObj);
    }

    return htmlString;
  };

  const handleClosings = () => {
    // Get the nearest closing tag index
    const closestOffset = Math.min(...endMap.keys());

    // get the array of style objects that close at nearest index
    const closestEnds = endMap.get(closestOffset);

    closestEnds.forEach((styleObj) => {
      const closingTags = handleOverlap(styleObj);
      const htmlString = `${closingTags}${getClosingTag(styleObj.style)}`;

      insertAtPos(htmlString, styleEndPos(styleObj));

      nest.splice(nest.indexOf(styleObj), 1);
    });

    // delete recently closed style end index
    endMap.delete(closestOffset);

    next();
  };

  const next = () => {
    if (styles.length) {
      const nextStyle = styles[0];

      if (endMap.size > 0) {
        const closestEndOffset = Math.min(...endMap.keys());
        if (nextStyle.offset < closestEndOffset) return handleStyle(nextStyle);
        return handleClosings();
      }

      return handleStyle(nextStyle);
    }

    if (nest.length) handleClosings();
    return false;
  };

  next();

  return retHTML;
}
