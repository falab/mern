import React from 'react';
import StyleButton from './StyleButton';
import 'draft-js/dist/Draft.css';

/**
 * Class representing the inline controls for our rich text editor
 * @extends React.Component
 * @prop {object} editorState
 * @prop {object[]} inlineStyles
 * @prop {function} onToggle
 */
export default class InlineControls extends React.Component {
  static propTypes = {
    editorState: React.PropTypes.object,
    inlineStyles: React.PropTypes.array,
    onToggle: React.PropTypes.func,
  }

  render() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls">
        {this.props.inlineStyles.map(inlineStyle =>
          <StyleButton
            key={inlineStyle.label}
            active={currentStyle.has(inlineStyle.style)}
            label={inlineStyle.label}
            onToggle={this.props.onToggle}
            style={inlineStyle.style}
          />
        )}
      </div>
    );
  }
}
