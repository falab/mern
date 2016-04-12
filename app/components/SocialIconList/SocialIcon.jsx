import React from 'react';

class SocialIcon extends React.Component {
  static propTypes = {
    service: React.PropTypes.string,
    linkUrl: React.PropTypes.string,
    iconPath: React.PropTypes.string,
  }

  render() {
    return (
      <a className="social-icon" title={this.props.service} href={this.props.linkUrl}>
        <img src={this.props.iconPath} alt={this.props.service} />
      </a>
    );
  }
}

export default SocialIcon;
