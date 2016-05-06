import { applyInlineStyles } from '.';
import { Elemental } from '.';

/**
 * Map of DraftJS block tag translations
 */
const BLOCK_DATA = new Map([
  ['unstyled', { type: 'div', alwaysWrap: true }],
  ['paragraph', { type: 'p', alwaysWrap: true }],
  ['header-one', { type: 'h1', alwaysWrap: true }],
  ['header-two', { type: 'h2', alwaysWrap: true }],
  ['header-three', { type: 'h3', alwaysWrap: true }],
  ['header-four', { type: 'h4', alwaysWrap: true }],
  ['header-five', { type: 'h5', alwaysWrap: true }],
  ['header-six', { type: 'h6', alwaysWrap: true }],
  ['blockquote', { type: 'blockquote', alwaysWrap: true }],
  ['code-block', { type: 'pre', alwaysWrap: true }],
]);

/**
 * Returns the html representation of a DraftJS ContentState
 * @param  {ContentState} contentState - a DraftJS ContentState object
 * @return {string} an html string
 */
export default function draftToHTML(contentState) {
  const parts = [];

  let lastType = null;
  let el = null;

  contentState.blockMap.forEach((contentBlock) => {
    const type = contentBlock.getType();

    if (type === 'code-block' && type === lastType) {
      el.addNewLine();
    } else {
      el = Elemental.createElement(BLOCK_DATA.get(type));
      parts.push(el);
    }

    el.addHTML(applyInlineStyles(contentBlock));

    lastType = type;
  });

  return parts.join('');
}
