import { Elemental } from '.';

/**
 * Map of DraftJS inline class translations
 */
const STYLE_MAP = new Map([
  ['BOLD', 'rich-bold'],
  ['ITALIC', 'rich-italic'],
  ['UNDERLINE', 'rich-underline'],
  ['CODE', false],
]);

/**
 * Returns an array of classes for styles
 * @param  {string[]} styles - an array of DraftJS inline styles
 * @return {string[]}
 */
const stylesToClasses = styles => (
  styles.map(style => STYLE_MAP.get(style)).toArray()
);

/**
 * Map of blacklisted characters
 */
const FILTER_MAP = new Map([
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['&', '&amp;'],
  ['"', '&quot;'],
  ['\'', '&#x27;'],
  ['/', '&#x2F;'],
]);

/**
 * Transforms blacklisted characters into their html-safe counterparts
 * @param  {string} char - a single character of text
 * @return {string} an html-safe representation of char
 */
const filter = char => (
  FILTER_MAP.has(char) ? FILTER_MAP.get(char) : char
);

/**
 * Returns a string of html representing the text in the contentBlock with the
 * inline styles applied.
 * @param  {ContentBlock} contentBlock - DraftJS content block
 * @return {string} all parts combined into one string
 */
export default function applyInlineStyles(contentBlock) {
  const parts = [];
  const contentText = contentBlock.getText();
  const ignoreStyles = contentBlock.getType() === 'code-block';

  let lastStyles;
  let el;

  for (let i = 0; i < contentText.length; i += 1) {
    const char = filter(contentText.charAt(i));
    const styles = contentBlock.getInlineStyleAt(i);

    if (styles !== lastStyles) {
      el = Elemental.createElement();
      parts.push(el);
    }

    if (! ignoreStyles) {
      if (! styles.has('CODE')) {
        el.addClasses(stylesToClasses(styles));
      } else {
        el.setType('code');
        el.addClasses('language-jsx');
        el.alwaysWrap();
      }

      lastStyles = styles;
    }

    el.addHTML(char);
  }

  return parts.join('');
}
