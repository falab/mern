import { applyInlineStyles, Elemental } from '.';

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
  ['code-block', [
    { type: 'pre', alwaysWrap: true },
    {
      type: 'code',
      classes: ['language-jsx', 'line-numbers'],
      alwaysWrap: true,
    },
  ]],
]);

export default function draftToHTML(contentState) {
  function createElement(type) {
    const blockData = BLOCK_DATA.get(type);

    if (! blockData.hasOwnProperty('length')) {
      return Elemental.createElement(blockData);
    }

    const el = Elemental.createElement(blockData[0]);

    blockData.slice(1).forEach((block) => {
      el.lastChild().wrap(Elemental.createElement(block));
    });

    return el;
  }

  const parts = [];
  let lastType;
  let el;

  /**
   * Returns the html representation of a DraftJS ContentState
   * @param  {ContentState} contentState - a DraftJS ContentState object
   * @return {string} an html string
   */
  function contentBlockToHTML(contentBlock) {
    const type = contentBlock.getType();

    if (type === 'code-block' && type === lastType) {
      el.addNewLine();
    } else {
      el = createElement(type);
      parts.push(el);
    }

    el.addHTML(applyInlineStyles(contentBlock));

    lastType = type;
  }

  contentState.blockMap.forEach(contentBlockToHTML);

  return parts.join('');
}
