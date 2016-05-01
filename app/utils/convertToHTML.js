import { convertToRaw } from 'draft-js';
import { applyInlineStyles } from '.';

const BLOCK_TYPES = {
  unstyled: ['<p>', '</p>'],
  'header-one': ['<h1>', '</h1>'],
  'header-two': ['<h2>', '</h2>'],
  'header-three': ['<h3>', '</h3>'],
  'header-four': ['<h4>', '</h4>'],
  'header-five': ['<h5>', '</h5>'],
  'header-size': ['<h6>', '</h6>'],
  blockquote: ['<blockquote>', '</blockquote>'],
};

export function convertToHTML(contentState) {
  const rawContent = convertToRaw(contentState);

  let retHTML = '';

  rawContent.blocks.forEach(({ text, type, inlineStyleRanges: styles }) => {
    const [blockOpenTag, blockCloseTag] = BLOCK_TYPES[type];
    retHTML += `
      ${blockOpenTag}
        ${applyInlineStyles({ text, styles })}
      ${blockCloseTag}
    `;
  });

  return retHTML;
}
