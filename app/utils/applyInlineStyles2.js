class StyleInliner {
  constructor(contentBlock) {
    this.text = contentBlock.getText();
    this.getInlineStyleAt = contentBlock.getInlineStyleAt.bind(contentBlock);
  }

  apply() {

    debugger;
    return '[styled content goes here]';
  }
}

export function applyInlineStyles2(contentBlock) {
  const inliner = new StyleInliner(contentBlock);
  return inliner.apply();
}
