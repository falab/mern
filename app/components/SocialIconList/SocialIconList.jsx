import React from 'react';
import axios from 'axios';
import SocialIcon from './SocialIcon';

/**
 * Class representing a list of social icons
 * @extends React.Component
 */
class SocialIconList extends React.Component {
  // Sets the initial state of the component
  constructor() {
    super();

    this.state = {
      icons: [],
    };
  }

  // Fires ajax request to retrieve social icon data and updates internal state
  componentDidMount() {
    axios
      .get('/api/socialIcons')
      .then((res) => {
        this.setState({ icons: res.data });
      });
  }

  render() {
    const { icons } = this.state;

    if (!icons.length) {
      return null;
    }

    return (
      <div className="social-icon-list">
        {icons.map((icon) =>
          <SocialIcon
            key={icon.id}
            service={icon.service}
            iconPath={icon.iconPath}
            linkUrl={icon.linkUrl}
          />
        )}
      </div>
    );
  }
}

export default SocialIconList;
