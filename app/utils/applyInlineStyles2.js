import { uniqueMerge } from '.';

class Elemental {
  static createElement({ type = 'span', className }) {
    const instance = new Elemental({ type, className });

    if (className) {
      let classes = className.split(' ').filter(Boolean);
    }

    return instance;
  }

  constructor({ type }) {
    this.type = type;
    this.classes = [];
    this.uMerge = uniqueMerge;

    debugger;
  }

  setType(type) {
    this.type = type;
  }

  addClass() {
    this.className += 'test';
  }
}

class StyleInliner {
  constructor(contentBlock) {
    this.text = contentBlock.getText();
    this.getStyles = contentBlock.getInlineStyleAt.bind(contentBlock);
    this.retText = '';
  }

  apply() {
    let currentEl;
    let lastStyles;

    for (let i = 0; i < this.text.length; i += 1) {
      const char = this.text.charAt(i);
      const styles = this.getStyles(i);
    }

    return '[styled content goes here]';
  }
}

export default function applyInlineStyles2(contentBlock) {
  const el = Elemental.createElement({ type: 'span', className: 'test' });
  // const inliner = new StyleInliner(contentBlock);
  // return inliner.apply();
}
