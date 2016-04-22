import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import * as BlogActions from '../../actions/BlogActions';

import 'draft-js/dist/Draft.css';

/**
 * Class representing the blog post form
 *
 * @extends React.Component
 * @prop {string} title
 * @prop {string} content
 **/
export default class BlogForm extends React.Component {
  static propTypes = {
    blogId: React.PropTypes.number,
    title: React.PropTypes.string,
    content: React.PropTypes.string,
  }

  static defaultProps = {
    title: '',
    content: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      content: props.content,
      editorState: EditorState.createEmpty(),
    };
  }

  submitAction = (e) => {
    e.preventDefault();
    const { title, content } = this.state;
    BlogActions.createPost({ title, content });
    this.setState({ title: '', content: '' });
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  focus = () => this.editor.focus()

  onEditorChanged = (editorState) => {
    const contentState = editorState.getCurrentContent();

    console.log(convertToRaw(contentState));

    this.setState({ editorState });
  }

  handlekeyCommand = (command) => {
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

  render() {
    const titleStyle = { width: '100%' };
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    let editorClassName = 'RichEditor-editor';

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        editorClassName += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="blog-form">
        <form onSubmit={this.submitAction}>
          <input
            type="text"
            placeholder="Title"
            style={titleStyle}
            value={this.state.title}
            onChange={this.updateTitle}
          />
          <br />
          <br />
          <div className="RichEditor-root">
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <div className={editorClassName} onClick={this.focus}>
              <Editor
                ref={(el) => { this.editor = el; }}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={this.state.editorState}
                placeholder="Tell a story..."
                onChange={this.onEditorChanged}
                spellCheck
              />
            </div>
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
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
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
