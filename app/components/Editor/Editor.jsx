import React from 'react';

import {
  Editor as DraftEditor,
  RichUtils,
} from 'draft-js';

import BlockControls from './BlockControls';
import InlineControls from './InlineControls';

import 'draft-js/dist/Draft.css';
import './editorStyle';

export { EditorState } from 'draft-js';

/**
 * Class representing rich text editor
 *
 * @extends React.Component
 */
export default class Editor extends React.Component {
  static propTypes = {
    editorState: React.PropTypes.object,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    onChange: (editorHTML) => {
      console.info('No updateContent set for editor');
      console.info(editorHTML);
    },
  }

  onEditorChanged = (editorState) => {
    this.props.onChange(editorState);
  }

  onEditorClick = () => this.editor.focus();

  getBlockStyle = (block) => {
    if (block.getType() === 'blockquote') return 'RichEditor-blockquote';
    return null;
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onEditorChanged(newState);
      return true;
    }

    return false;
  }

  toggleBlockType = (blockType) => this.onEditorChanged(
    RichUtils.toggleBlockType(this.props.editorState, blockType)
  )

  toggleInlineStyle = (inlineStyle) => this.onEditorChanged(
    RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
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
    const { editorState } = this.props;
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
            editorState={this.props.editorState}
            placeholder="Tell a story..."
            onChange={this.onEditorChanged}
            spellCheck
          />
        </div>
      </div>
    );
  }
}
