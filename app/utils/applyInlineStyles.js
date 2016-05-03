import { Elemental } from '.';

const STYLE_MAP = new Map([
  ['BOLD', 'rich-bold'],
  ['ITALIC', 'rich-italic'],
  ['UNDERLINE', 'rich-underline'],
  ['CODE', 'rich-code'],
]);

const stylesToClasses = styles => styles.map(style => STYLE_MAP.get(style)).toArray();

export default function applyInlineStyles(contentBlock) {
  const parts = [];
  const contentText = contentBlock.getText();

  let lastStyles = null;
  let el = null;

  for (let i = 0; i < contentText.length; i += 1) {
    const char = contentText.charAt(i);
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
