const STYLE_TYPES = {
  BOLD: ['<b>', '</b>'],
  ITALIC: ['<em>', '</em>'],
  UNDERLINE: ['<u>', '</u>'],
  CODE: ['<span class="mono">', '</span>'],
};

export function applyInlineStyles({ text, styles }) {
  const nest = [];
  const endMap = new Map();

  let retHTML = text;
  let leftPad = 0; // ;-D

  const insertTagAtPos = (tag, pos) => {
    const _pos = pos + leftPad;

    // Insert new tag into HTML string
    retHTML = `${retHTML.slice(0, _pos)}${tag}${retHTML.slice(_pos)}`;

    // Add to leftPad
    leftPad += tag.length;
  };

  const handleStyles = () => {
    const styleObj = styles[0];
    const [openingTag] = STYLE_TYPES[styleObj.style];

    // Add to the nest
    nest.push(styleObj);

    insertTagAtPos(openingTag, styleObj.offest);

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

    const tags = endMap.get(closestOffset).map((styleObj) => {
      nest.splice(nest.indexOf(styleObj), 1);
      return STYLE_TYPES[styleObj.style][1];
    });

    console.log(tags);

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

  console.log(retHTML, JSON.stringify(styles));
  return retHTML;
}
