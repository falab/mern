import React from 'react';
import StyleButton from './StyleButton';

import 'draft-js/dist/Draft.css';

export default class BlockControls extends React.Component {
  static propTypes = {
    editorState: React.PropTypes.object,
    blockStyles: React.PropTypes.array,
    onToggle: React.PropTypes.function,
  }

  render() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {this.props.blockStyles.map((blockStyle) =>
          <StyleButton
            key={blockStyle.label}
            active={blockStyle.style === blockType}
            label={blockStyle.label}
            onToggle={this.props.onToggle}
            style={blockStyle.style}
          />
        )}
      </div>
    );
  }
}
