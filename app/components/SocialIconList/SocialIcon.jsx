import React from 'react';

class SocialIcon extends React.Component {
  render() {
    return (
      <a className="social-icon" title={this.props.service} href={this.props.linkUrl}>
        <img src={this.props.iconPath} alt="{this.props.service}" />
      </a>
    );
  }
}

SocialIcon.propTypes = {
  service: React.PropTypes.string,
  linkUrl: React.PropTypes.string,
  iconPath: React.PropTypes.string,
};

export default SocialIcon;
