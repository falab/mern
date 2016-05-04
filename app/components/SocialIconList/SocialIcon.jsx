import React from 'react';

/**
 * Class representing a social service icon buttons
 * @extends React.Component
 * @prop {string} service - name of the service (e.g. Facebook, Twitter, etc)
 * @prop {string} linkUrl - the url the button will be linking to
 * @prop {string} iconPath - the url/path to the icon image
 */
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
