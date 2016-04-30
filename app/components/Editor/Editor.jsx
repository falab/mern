import React from 'react';

import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
} from 'draft-js';

import BlockControls from './BlockControls';
import InlineControls from './InlineControls';

import 'draft-js/dist/Draft.css';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorChanged = (editorState) => this.setState({ editorState })

  onEditorClick = () => this.editor.focus();

  getBlockStyle = (block) => {
    if (block.getType() === 'blockquote') return 'RichEditor-blockquote';
    return null;
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onEditorChanged(newState);
      return true;
    }

    return false;
  }

  toggleBlockType = (blockType) => this.onEditorChanged(
    RichUtils.toggleBlockType(this.state.editorState, blockType)
  )

  toggleInlineStyle = (inlineStyle) => this.onEditorChanged(
    RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
  )

  blockStyles = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
  ]

  inlineStyles = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
  ]

  render() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const styleMap = {
      CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
    };

    let editorClassName = 'RichEditor-editor';

    if (! contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        editorClassName += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockControls
          blockStyles={this.blockStyles}
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineControls
          inlineStyles={this.inlineStyles}
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={editorClassName} onClick={this.onEditorClick}>
          <DraftEditor
            ref={(el) => { this.editor = el; }}
            blockStyleFn={this.getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            placeholder="Tell a story..."
            onChange={this.onEditorChanged}
            spellCheck
          />
        </div>
      </div>
    );
  }
}
