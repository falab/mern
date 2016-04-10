import React from 'react';
import request from 'superagent';
import SocialIcon from './SocialIcon';

class SocialIconList extends React.Component {
  state = {
    icons: [],
  }

  componentDidMount() {
    request
      .get('/api/socialIcons')
      .type('json')
      .end((err, res) => {
        if (err) throw err;
        this.setState({ icons: res.body });
      });
  }

  render() {
    const icons = [];

    this.state.icons.forEach((icon) => {
      icons.push(<SocialIcon
        key={icon.id}
        service={icon.service}
        iconPath={icon.iconPath}
        linkUrl={icon.linkUrl}
      />);
    });

    return (
      <div className="social-icon-list">
        {icons}
      </div>
    );
  }
}

export default SocialIconList;
