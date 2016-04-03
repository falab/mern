import React from 'react';

import { Link } from 'react-router';

export default class MenuItem extends React.Component {
  _handleClick = (e) => {
    const target = e.target;

    if (!target.hasAttribute('href')) {
      target.querySelector('a').click();
    }
  }

  render() {
    return (
      <li onClick={this._handleClick} className="menuItem">
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

MenuItem.propTypes = {
  to: React.PropTypes.string,
  children: React.PropTypes.node,
};
