import { applyInlineStyles } from '.';

/**
 * Map of DraftJS block tag translations
 */
const BLOCK_TYPES = new Map([
  ['unstyled', ['<div>', '</div>']],
  ['paragraph', ['<p>', '</p>']],
  ['header-one', ['<h1>', '</h1>']],
  ['header-two', ['<h2>', '</h2>']],
  ['header-three', ['<h3>', '</h3>']],
  ['header-four', ['<h4>', '</h4>']],
  ['header-five', ['<h5>', '</h5>']],
  ['header-size', ['<h6>', '</h6>']],
  ['blockquote', ['<blockquote>', '</blockquote>']],
  ['code-block', ['<pre>', '</pre>']],
]);

/**
 * Returns the html representation of a DraftJS ContentState
 * @param  {ContentState} contentState - a DraftJS ContentState object
 * @return {string} an html string
 */
export default function draftToHTML(contentState) {
  let retHTML = '';

  contentState.blockMap.forEach((contentBlock) => {
    const type = contentBlock.getType();
    const [blockOpenTag, blockCloseTag] = BLOCK_TYPES.get(type);
    const styledContent = applyInlineStyles(contentBlock);

    retHTML += `${blockOpenTag}${styledContent}${blockCloseTag}`;
  });

  return retHTML;
}
