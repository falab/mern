import { Elemental } from '.';

const STYLE_MAP = new Map([
  ['BOLD', 'rich-bold'],
  ['ITALIC', 'rich-italic'],
  ['UNDERLINE', 'rich-underline'],
  ['CODE', 'rich-code'],
]);

const FILTER_MAP = new Map([
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['&', '&amp;'],
  ['"', '&quot;'],
  ['\'', '&#x27;'],
  ['/', '&#x2F;'],
]);

const stylesToClasses = styles => styles.map(style => STYLE_MAP.get(style)).toArray();
const filter = char => (FILTER_MAP.has(char) ? FILTER_MAP.get(char) : char);

export default function applyInlineStyles(contentBlock) {
  const parts = [];
  const contentText = contentBlock.getText();

  let lastStyles = null;
  let el = null;

  for (let i = 0; i < contentText.length; i += 1) {
    const char = filter(contentText.charAt(i));
    const styles = contentBlock.getInlineStyleAt(i);

    if (styles !== lastStyles) {
      el = Elemental.createElement({ classes: stylesToClasses(styles) });
      parts.push(el);
    }

    el.addText(char);
    lastStyles = styles;
  }

  return parts.join('');
}
