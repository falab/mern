import { convertToRaw } from 'draft-js';

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

const STYLE_TYPES = {
  BOLD: ['<b>', '</b>'],
  ITALIC: ['<em>', '</em>'],
  UNDERLINE: ['<u>', '</u>'],
  CODE: ['<span class="mono">', '</span>'],
};

export default function convertToHTML(contentState) {
  const rawContent = convertToRaw(contentState);

  let retHTML = '';

  rawContent.blocks.forEach(({ text, type, inlineStyleRanges: styles }) => {
    const [blockOpenTag, blockCloseTag] = BLOCK_TYPES[type];
    retHTML += `${blockOpenTag}${text}${blockCloseTag}`;
  });

  return retHTML;
}
