import React from 'react';

/**
 * Class representing a control button for our rich text editor
 *
 * @extends React.Component
 * @prop {boolean} active
 * @prop {string} label
 * @prop {function} onToggle
 * @prop {string} style
 **/
export default class StyleButton extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    label: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    style: React.PropTypes.string,
  }

  onMouseDown = (e) => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';

    if (this.props.active) className += ' RichEditor-activeButton';

    return (
      <span className={className} onMouseDown={this.onMouseDown}>
        {this.props.label}
      </span>
    );
  }
}
